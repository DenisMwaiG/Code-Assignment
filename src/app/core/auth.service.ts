import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserRole } from '../data/types/Auth.interface';

interface UserInfo {
  userId: string;
  userRole: UserRole;
  userName: string;
  displayName: string;
  stream: string;
  form: string;
}

interface LoginResponse extends UserInfo {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject: BehaviorSubject<UserInfo | null>;
  public userInfo$: Observable<UserInfo | null>;
  public userInfo!: UserInfo | null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Initialize the BehaviorSubject with a value from localStorage, if available
    const savedUserInfo = localStorage.getItem('userInfo');
    const parsedUserInfo = savedUserInfo ? JSON.parse(savedUserInfo) : null;
    if (parsedUserInfo && parsedUserInfo.error) {
      this.logout();
    }
    this.userInfoSubject = new BehaviorSubject<UserInfo | null>(parsedUserInfo);
    this.userInfo$ = this.userInfoSubject.asObservable();
    this.userInfo = parsedUserInfo;
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('/login', {
      username,
      password,
    }).pipe(
      tap((userInfo) => {
        if (userInfo.error || !userInfo) {
          console.error('Login error:', userInfo.error);
          throwError(() => new Error(userInfo.error || 'Please enter a valid username and password.'));
        }
        this.userInfoSubject.next(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        this.redirectUser(userInfo);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('An error occurred during login.'));
      })
    );
  }

  private redirectUser(userInfo: UserInfo) {
    switch (userInfo.userRole) {
      case UserRole.Admin:
        return this.router.navigate(['/dashboard']);
      case UserRole.Teacher:
        return this.router.navigate([`/form/${userInfo.form}/overview`]);
      case UserRole.Student:
        return this.router.navigate([`/student/${userInfo.userId}/overview`]);
      default:
        return { error: 'Invalid user role' };
    }
  }

  logout() {
    this.userInfoSubject.next(null);
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}
