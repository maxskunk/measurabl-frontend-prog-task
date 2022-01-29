import { Component } from '@angular/core';
import { MsrMockApiService } from './service/msr-mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];
  dataSource = [];

  constructor(private msservice: MsrMockApiService) {
    this.msservice.getUserAges().subscribe(res => {
      console.log("RES: " + JSON.stringify(res))
    });

    this.msservice.getUserNames().subscribe(res => {
      console.log("WEE: " + JSON.stringify(res));
    })
  }


}
