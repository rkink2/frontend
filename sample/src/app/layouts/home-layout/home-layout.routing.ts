import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ForgotPasswordComponent } from 'src/app/pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/auth/reset-password/reset-password.component';

export const HomeLayoutRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    }
];
