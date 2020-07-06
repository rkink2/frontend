import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HomeLayoutRoutes } from './home-layout.routing';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ForgotPasswordComponent } from 'src/app/pages/auth/forgot-password/forgot-password.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ResetPasswordComponent } from 'src/app/pages/auth/reset-password/reset-password.component';
import { ActivationComponent } from 'src/app/pages/auth/activation/activation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    NgImageSliderModule,
    ReactiveFormsModule,
    ToastrModule,
    // NgbModule
  ],
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ResetPasswordComponent,
    ActivationComponent,
  ],
  providers: [
    ToastrService
  ]
})
export class HomeLayoutModule { }
