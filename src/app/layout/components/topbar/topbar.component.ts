import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { filter } from 'rxjs';
import { UserRole } from '../../../data/types/Auth.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  role!: UserRole;
  username!: string;

  constructor (private authService: AuthService) {}

  ngOnInit() {
    this.authService.userInfo$
      .pipe(filter(Boolean))
      .subscribe((userInfo) => {
        this.role = userInfo.userRole;
        this.username = userInfo.displayName;
      });
  }
}
