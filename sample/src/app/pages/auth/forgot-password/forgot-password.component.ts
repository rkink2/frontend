import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  errorMsg: null;
  public isSubmit = false;

  constructor(
    private _formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public tokenService: TokenService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public sendRequest(): any {
    this.isSubmit = true;
    if (this.forgotPasswordForm.invalid) {
      return false;
    }
    this.authService.sendPasswordResetLink(this.forgotPasswordForm.value).subscribe(
      data => {
        console.log("data", data);
        this.toastr.success(data['notification']);
      },
      error => {
        console.log("error: ", error);
        this.toastr.error(error.error['error'])
      }
    )
  }

}
