import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { UserService } from '../user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: any;

  pageSize: number = 5;
  pageNo: number = 1;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageEvent: PageEvent;
  totalCount: number;

  /** total page */
  public totalPage: number;

  /** page nation number array */
  public pages: any[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.getCurrentUsers(this.pageNo, this.pageSize);
  }


  onSetPage(event): void {
    this.pageSize = event.pageSize;
    // this.userService.User.next({ pageNo: event.pageIndex + 1, numPerPage: event.pageSize })
  }

  /** get current page users */
  public getCurrentUsers(pageNo: number, numPerPage: number): void {
    this.userService.getUsers(pageNo, numPerPage).subscribe(
      data => {
        console.log(data);
        this.users = data['users'];
        this.totalCount = data['totalCount'];
        this.totalPage = Math.floor(this.totalCount / this.pageSize) + 1;
        this.pages = new Array(this.totalPage);

      },
      error => {
        console.log(error);
        if (error.status === 301) {
          this.authService.logout()
        }
      }
    )
  }

  public editUser(userID: number): any {

    this.router.navigate(['admin/users/add'], { queryParams: { userID: userID } });
  }

  /**
   * user delete
   */

  public deleteUser(userId): any {
    console.log(userId)
    this.userService.deleteUser(userId).subscribe(
      data => {
        console.log("Delete response data: ", data);
        this.toastr.success(data['notification']);
        window.location.reload()
      },
      error => {
        console.log("Delete response Error: ", error);
        this.toastr.error(error.error['error'])
      }
    )
  }

  /** go to previous page */
  public goToPrevious(): void {
    if (this.pageNo > 1) {
      this.pageNo = this.pageNo - 1;
      this.getCurrentUsers(this.pageNo, this.pageSize);
    }
  }

  /** go to page by index */
  public goToPage(index: number): void {
    this.pageNo = index + 1;
    this.getCurrentUsers(this.pageNo, this.pageSize);
  }

  /** go to next page */
  public goToNextPage(): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo = this.pageNo + 1;
      this.getCurrentUsers(this.pageNo, this.pageSize);
    }
  }
}

