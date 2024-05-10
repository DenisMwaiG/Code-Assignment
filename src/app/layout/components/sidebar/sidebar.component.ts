import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { MenuOption, menuOptions } from '../../data/menu';
import { AuthService } from '../../../core/auth.service';
import { UserInfo, UserRole } from '../../../data/types/Auth.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navOptions!: MenuOption[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userInfo$
      .pipe(filter(Boolean))
      .subscribe((userInfo) => {
        this.navOptions = menuOptions[userInfo.userRole]
          .map(opt => this.personaliseLinks(opt, userInfo));
      });
  }

  private personaliseLinks(menuOption: MenuOption, userInfo: UserInfo) {
  if (userInfo.userRole === UserRole.Teacher) {
      return {
        ...menuOption,
        link: menuOption.link.replace('teacherForm', userInfo.form as string),
      };
    }
    if (userInfo.userRole === UserRole.Student) {
      return {
        ...menuOption,
        link: menuOption.link.replace('studentId', userInfo.userId),
      };
    }
    return menuOption;
  }

  logout() {
    this.authService.logout();
  }
}
