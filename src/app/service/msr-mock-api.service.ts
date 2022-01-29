import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MsrMockApiService {

  constructor(private http: HttpClient) { }

  public getUserAges(): Observable<any> {
    const url = `${environment.endpoint}/msr/ages`;
    return this.http.get<any>(url);
  }

  public getUserNames(): Observable<any> {
    const url = `${environment.endpoint}/msr/names`;
    return this.http.get<any>(url);
  }
}
