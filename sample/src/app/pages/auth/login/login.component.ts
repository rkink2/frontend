import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public errorMsg = null;
  public isSubmit = false;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public auth: AuthService,
    public token: TokenService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.errorMsg = null;
    })
  }
  ngOnDestroy() {
  }

  public onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    }
    this.auth.login(this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error => {
        this.toastr.error(error.error['error'])
        console.log("login Error: ", error)
        this.errorMsg = error.error['error'];

      }
    )
  }

  private handleResponse(data) {
    if (data['user'].email_verified !== null) {
      this.token.handle(data);
      this.auth.changeAuthStatus(true);
      this.toastr.success("Login Successfully!")
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMsg = "Please verify email address!";
      this.toastr.error("Please verify email address!")
    }
  }

}
