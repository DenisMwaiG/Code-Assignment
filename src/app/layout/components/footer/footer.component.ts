import { Component } from '@angular/core';
import { MenuOption, menuOptions } from '../../data/menu';
import { AuthService } from '../../../core/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

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
