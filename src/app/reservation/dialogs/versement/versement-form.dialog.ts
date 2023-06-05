import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DialogVersementData } from "../../models/reservation";


@Component({
    selector: 'dialog-versement-form',
    templateUrl: './dialog-versement-form.html',
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
})
export class DialogVersementForm {
    constructor(
        public dialogRef: MatDialogRef<DialogVersementForm>,
        @Inject(MAT_DIALOG_DATA) public data: DialogVersementData,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}