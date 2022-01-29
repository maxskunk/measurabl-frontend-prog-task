import { Component } from '@angular/core';
import { User } from './models/user.model';
import { MsrMockApiService } from './service/msr-mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];
  dataSource: User[] = [];

  constructor(private msservice: MsrMockApiService) {
    this.msservice.getUsers().subscribe(res => {
      console.log("NORMALIZED: " + JSON.stringify(res));
      this.dataSource = res;
    })
  }




}
