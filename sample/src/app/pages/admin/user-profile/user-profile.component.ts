import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.user = this.tokenService.getUser();
    console.log(this.user)
  }

}
