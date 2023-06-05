import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationValidators } from '../reservation/validators/registration.validators';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ReservationHttpService } from '../reservation/services/reservation-http.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  montantTotal: number = 0;
  showConfirmation: boolean = false;
  durationInSeconds: number = 0;
  subscriptions: Subject<any> = new Subject();
  maxDate: Date | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private reservationHttpService: ReservationHttpService) {
  }

  ngOnInit(): void {
    this.buildReservationForm();
    this.daysBetween();
  }

  buildReservationForm() {
    this.reservationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      contact: ['', Validators.required],
      quantity: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, RegistrationValidators.priceValidator]],
      heure: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.reservationForm.valid) {
      this.reservationHttpService.createReservation(this.reservationForm.value).pipe(takeUntil(this.subscriptions))
        .subscribe(this.callSaveReservation.bind(this));
    }
  }

  callSaveReservation() {
    this.resetForm();
    this.openSnackBar("Enregistrée avec succès", "Fermer");
  }

  resetForm() {
    this.reservationForm.reset();
    this.calculMontant();
  }

  calculMontant() {
    if (this.reservationForm)
      this.montantTotal = this.reservationForm.get('quantity')?.value * this.reservationForm.get('price')?.value
  }

  daysBetween() {
    if (this.reservationForm && this.reservationForm.get('startDate'))
      this.reservationForm.get('endDate')?.valueChanges.pipe(takeUntil(this.subscriptions))
        .subscribe((value: Date) => {
          const lastChoice = 'endDate';
          this.callDaysBetween.call(this, value, lastChoice);
        })

    this.reservationForm.get('startDate')?.valueChanges.pipe(takeUntil(this.subscriptions))
      .subscribe((value: Date) => {
        const lastChoice = 'startDate';
        this.callDaysBetween.call(this, value, lastChoice);
      })

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    });
  }

  callDaysBetween(value: Date, lastChoice: string) {
    if (lastChoice === "startDate") {
      const daysbetween = Utils.differenceInDays(value, this.reservationForm.get('endDate')?.value)
      this.reservationForm.controls['quantity'].setValue(daysbetween);
    } else {
      const daysbetween = Utils.differenceInDays(this.reservationForm.get('startDate')?.value, value)
      this.reservationForm.controls['quantity'].setValue(daysbetween);
    }
    this.getMaxDate();
  }

  getMaxDate(): void {
    const dateFin = this.reservationForm.get('endDate')?.value;
    this.maxDate = dateFin ? new Date(dateFin-1) : null;
  }

}