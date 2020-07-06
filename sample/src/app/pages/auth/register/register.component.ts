import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg: null;
  public isSubmit = false;
  public customCheckRegister;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public auth: AuthService,
    public token: TokenService,
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: [''],
      customCheckRegister: ['']
    }, {
      validator: this.token.ConfirmedValidator('password', 'confirmPass')
    })

    this.registerForm.valueChanges.subscribe((data) => {
      this.errorMsg = null;
    })
  }

  public onSubmit(): any {
    this.isSubmit = true;
    if (this.registerForm.invalid) {
      return false;
    }
    console.log(this.registerForm.value)
    this.auth.register(this.registerForm.value).subscribe(
      data => {
        console.log(data['notification'])
        this.toastr.success(data['notification'])
        this.router.navigate(['login'])
      },
      error => {
        console.log('Register Error: ', error)
        this.toastr.error(error.error['error'])
      }
    )
  }


}
