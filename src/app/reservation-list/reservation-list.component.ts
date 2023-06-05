import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../reservation/models/reservation';
import { ReservationHttpService } from '../reservation/services/reservation-http.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  displayedColumns: string[] = ['contact', 'lastName', 'startDate', 'action'];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Reservation | undefined;
  subscriptions: Subject<any> = new Subject();

  constructor(private reservationHttpService: ReservationHttpService) {
    // Create 100 users
    this.getReservations();
    
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getReservations() {
    this.reservationHttpService.getReservations().pipe(takeUntil(this.subscriptions))
        .subscribe(this.callGetReservations.bind(this));
  }

  callGetReservations(reservations: Reservation[]) {
    this.dataSource = new MatTableDataSource(reservations);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  }
}
