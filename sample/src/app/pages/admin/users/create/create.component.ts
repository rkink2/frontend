import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  public isSubmit = false;
  public user: any = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }
  userId: number;
  errorMsg: null;
  userID: number;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public tokenService: TokenService,
    public userService: UserService
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params.userID) {
        this.userID = params.userID;
        this.userService.getUser(params.userID).subscribe(
          data => {
            console.log(data);
            console.log(data.user)
            this.user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone
            }
            this.initWithUser(this.user);
          }
        )
      } else {
        this.initialize();
      }
    });
  }

  ngOnInit(): void {

    // this.createForm.valueChanges.subscribe((data) => {
    //   this.errorMsg = null;
    // })
  }

  /** initialize when creat user */
  public initialize(): void {
    this.createForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: [''],
    }, {
      validator: this.tokenService.ConfirmedValidator('password', 'confirmPass')
    })
  }

  /** init user when edit by id */
  public initWithUser(user: any): void {
    this.createForm = this._formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required, Validators.minLength(10)]],
      password: [''],
      confirmPass: [''],
    })
  }

  public addUserSubmit(): any {
    this.isSubmit = true;
    if (this.createForm.invalid) {
      return false;
    }
    console.log("create form: ", this.createForm);
    this.userService.saveUser(this.createForm.value).subscribe(
      data => {
        console.log("Response data: ", data);
        this.toastr.success(data['notification']);
        this.router.navigate(["../admin/users"]);
        // this.router.navigateByUrl('admin/users/');
      },
      error => {
        console.log("Error: ", error)
        this.toastr.error(error.error['error'])
      }
    )
  }

}
