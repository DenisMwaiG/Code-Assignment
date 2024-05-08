import { Routes } from '@angular/router';
import { LandingPageComponent } from './public-pages/landing-page/landing-page.component';
import { LoginPageComponent } from './public-pages/login-page/login-page.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./app-pages/app-pages.module').then(m => m.AppPagesModule)
  },
  { path: '**', redirectTo: '' }
];
