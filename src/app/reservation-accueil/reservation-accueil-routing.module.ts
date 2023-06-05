import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationAccueilComponent } from './reservation-accueil.component';

const routes: Routes = [{ path: '', component: ReservationAccueilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationAccueilRoutingModule { }
