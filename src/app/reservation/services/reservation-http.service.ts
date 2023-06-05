import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation, Versement } from "../models/reservation";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ReservationHttpService {

    constructor(private http: HttpClient) {
    }
    getReservation(id: number) {
        return this.http.get<Reservation>(environment.baseUrl + '/reservations/' + id);
    }

    getReservations() {
        return this.http.get<Reservation[]>(environment.baseUrl + '/reservations');
    }

    createReservation(reservation: Reservation) {
        //return this.http.post<Reservation>('https://ocalm-back.herokuapp.com/reservations', reservation);
        return this.http.post<Reservation>(environment.baseUrl + '/reservations', reservation);
    }

    createVersement(versement: Versement, reservationId: number) {
        const payload = {
            reservationId: reservationId,
            versement: versement
        }
        return this.http.post<any>(environment.baseUrl + '/versements', payload);
    }

    getLastVersement(reservationId: number) {
        return this.http.get<Versement>(environment.baseUrl + '/versements/last/' + reservationId);
    }

    printReservation(reservationId: number) {
        return this.http.get(environment.baseUrl + '/reservations/' + reservationId + '/pdf',{ responseType: 'blob' });
    }
}