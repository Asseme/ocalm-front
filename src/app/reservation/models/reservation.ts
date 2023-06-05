export interface Reservation {
    id: number,
    lastName: string,
    firstName: string,
    contact: string,
    numberOfDays: number
    quantity: number,
    price: number,
    startDate: Date;
    endDate: Date;
    heure: string;
    amount: number,
    paid: number,
    rest: number,
    versements: Versement[]
}

export interface Versement {
    name: string;
    amount: number;
    dateVersement: Date;
    ordre?: number
}

export interface DialogVersementData extends Versement {
    reservationId: number;
}