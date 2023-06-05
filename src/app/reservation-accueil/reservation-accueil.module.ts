import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationAccueilRoutingModule } from './reservation-accueil-routing.module';
import { ReservationAccueilComponent } from './reservation-accueil.component';


@NgModule({
  declarations: [
    ReservationAccueilComponent
  ],
  imports: [
    CommonModule,
    ReservationAccueilRoutingModule
  ]
})
export class ReservationAccueilModule { }
