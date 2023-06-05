import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  {
    path: 'reservation-accueil',
    loadChildren: () => import('../reservation-accueil/reservation-accueil.module')
      .then(m => m.ReservationAccueilModule)
  },
  {
    path: 'reservation-form',
    loadChildren: () => import('../reservation-form/reservation-form.module')
      .then(m => m.ReservationFormModule)
  },
  {
    path: 'reservation-list',
    loadChildren: () => import('../reservation-list/reservation-list.module')
      .then(m => m.ReservationListModule)
  },
  {
    path: 'reservation-detail/:id', loadChildren: () => import('../reservation-detail/reservation-detail.module').then(m => m.ReservationDetailModule)
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
