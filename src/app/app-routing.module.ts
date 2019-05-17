import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'faq', pathMatch: 'full' },
  { path: 'forgot-password', loadChildren: './pages/public/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/public/register/register.module#RegisterPageModule' },
  {
    path: 'members',
    loadChildren: './pages/authenticated/authenticated-routing.module#AuthenticatedRoutingModule'
  },
  { path: 'password-otp', loadChildren: './pages/public/password-otp/password-otp.module#PasswordOtpPageModule' },
  { path: 'reset-password', loadChildren: './pages/public/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'faq', loadChildren: './pages/public/faq/faq.module#FaqPageModule' },
  { path: 'about', loadChildren: './pages/public/about/about.module#AboutPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
