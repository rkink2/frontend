import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/admin/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/admin/users', title: 'User Management', icon: 'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.user = this.tokenService.getUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout(): any {
    this.authService.logout()
  }
}
