import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  public isSubmit = false;
  public resetToken: String;
  public email: String;
  public errorMsg = null;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
      this.email = params['email'];
      console.log(this.email)
    })
  }

  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      email: [this.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: [''],
      resetToken: [this.resetToken, Validators.required],
    }, {
      validator: this.tokenService.ConfirmedValidator('password', 'confirmPass')
    })

    this.resetPasswordForm.valueChanges.subscribe((data) => {
      this.errorMsg = null;
    })
  }

  public resetPassword(): any {
    this.isSubmit = true;
    if (this.resetPasswordForm.invalid) {
      return false;
    }
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data['notification']);
        this.router.navigate(['login'])
      },
      error => {
        console.log(error);
        this.toastr.error(error.error['error'])
      }
    )

  }

}
