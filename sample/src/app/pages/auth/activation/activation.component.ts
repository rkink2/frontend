import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public isSubmit = false;
  public activeToken: String;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      this.activeToken = params['token'];
    })
  }

  ngOnInit(): void {
    if (this.activeToken === null || this.activeToken === "") {
      this.router.navigate(['login']);
    }

    this.authService.userActivation(this.activeToken).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data['notification']);
        this.router.navigate(['login'])
      },
      error => {
        console.log(error);
        this.toastr.error(error.error['error']);
      }
    )
  }
}
