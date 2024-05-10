import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { MenuOption, menuOptions } from '../../data/menu';
import { AuthService } from '../../../core/auth.service';

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
        this.navOptions = menuOptions[userInfo.userRole];
      });
  }

  logout() {
    this.authService.logout();
  }
}
