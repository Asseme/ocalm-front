import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationListRoutingModule } from './reservation-list-routing.module';
import { ReservationListComponent } from './reservation-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    ReservationListRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ]
})
export class ReservationListModule { }
