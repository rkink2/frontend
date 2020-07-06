import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const userRoute: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'add',
    component: CreateComponent
  }
];

@NgModule({
  declarations: [IndexComponent, CreateComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoute)
  ],
  providers: [
    FormsModule
  ]
})
export class UsersModule { }
