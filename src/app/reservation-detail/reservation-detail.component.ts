import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation, Versement } from '../reservation/models/reservation';
import { ReservationHttpService } from '../reservation/services/reservation-http.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogVersementForm } from '../reservation/dialogs/versement/versement-form.dialog';
import * as _ from 'lodash';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  print() {
    this.reservationHttpService.printReservation(this.reservationId).pipe(takeUntil(this.subscriptions))
      .subscribe(this.callPrintReservation.bind(this))
  }
  reservation: Reservation | undefined;
  subscriptions: Subject<any> = new Subject();
  name: string = 'Versement ';
  amount: number = 0;
  date: Date = new Date();
  versement: Versement | undefined;
  lastVersement: Versement | undefined;
  reservationId: number = 0;

  constructor(private route: ActivatedRoute, private reservationHttpService: ReservationHttpService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.reservationId = this.route.snapshot.params['id'];
    this.getReservation(this.reservationId);
    this.getLastVersement();
  }

  private getReservation(_id: any) {
    this.reservationHttpService.getReservation(_id).pipe(takeUntil(this.subscriptions))
      .subscribe(this.callGetReservation.bind(this));
  }

  callGetReservation(reservation: Reservation) {
    console.log('success');
    this.reservation = reservation;
  }

  openDialog(): void {
    const ordre = _.get(this.lastVersement, 'ordre', 0);
    const dialogRef = this.dialog.open(DialogVersementForm, {
      data: { name: this.name + (+ordre + 1), date: this.date, amount: this.amount, reservationId: this.reservationId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.versement = result;
      console.log(result)
      if (!this.versement) return;
      this.reservationHttpService.createVersement(this.versement, +result.reservationId).pipe(takeUntil(this.subscriptions))
        .subscribe(this.callSaveVersement.bind(this));

    });
  }

  callSaveVersement() {
    this.getReservation(this.reservationId);
    this.getLastVersement();
  }

  callGetLastVersement(versement: Versement) {
    this.lastVersement = versement;
  }

  getLastVersement() {
    this.reservationHttpService.getLastVersement(this.reservationId).pipe(takeUntil(this.subscriptions))
      .subscribe(this.callGetLastVersement.bind(this));
  }

  callPrintReservation(data: Blob) {
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
}
