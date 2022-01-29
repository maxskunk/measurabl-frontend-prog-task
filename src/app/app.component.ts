import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/user.model';
import { MsrMockApiService } from './service/msr-mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private msservice: MsrMockApiService) {
  }

  ngOnInit() {
    this.msservice.getUsers().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      this.dataSource.data = res;
    })

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const filterValue: string = filter.trim().toLowerCase();
      return data.firstName !== undefined && data.firstName?.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.lastName !== undefined && data.lastName?.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.age !== undefined && data.age?.toString()?.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.id !== undefined && data.id?.toString()?.trim().toLowerCase().indexOf(filterValue) !== -1
    };
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public applyFilter(filterValue: string) {
    if (!filterValue || filterValue === '' || filterValue === ' ') {
      this.dataSource.filter = '';
    }
    else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
