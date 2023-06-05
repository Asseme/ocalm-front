import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationDetailRoutingModule } from './reservation-detail-routing.module';
import { ReservationDetailComponent } from './reservation-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    ReservationDetailComponent
  ],
  imports: [
    CommonModule,
    ReservationDetailRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  ]
})
export class ReservationDetailModule { }
