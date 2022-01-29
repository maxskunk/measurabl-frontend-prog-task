import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAge } from '../models/user-age.model';
import { UserName } from '../models/user-name.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MsrMockApiService {

  /**
   * This map is used to normalize the data from the two separate calls
   */
  private _userMap = new Map<string, User>();

  constructor(private http: HttpClient) { }

  public getUserAges(): Observable<UserAge[]> {
    const url = `${environment.endpoint}/msr/ages`;
    return this.http.get<UserAge[]>(url);
  }

  public getUserNames(): Observable<UserName[]> {
    const url = `${environment.endpoint}/msr/names`;
    return this.http.get<UserName[]>(url);
  }

  public getUsers(): Observable<User[]> {
    //Clear out the user map
    this._userMap = new Map<string, User>()

    return forkJoin([this.getUserAges(), this.getUserNames()]).pipe(
      map(([userAges, userNames]) => {
        userAges.forEach(age => this.addUserDataToMap(age));
        userNames.forEach(name => this.addUserDataToMap(name));
        //Once the map is build we convert it to an array of users
        return [...this._userMap].map(([k, v]) => { return v });
      }));
  }

  /*
  * For each row we receive lets add a dictionary item
  * if id is already in dictionary we add to the data
  */
  private addUserDataToMap(data: UserAge | UserName) {
    if (data.id) {
      const user = this._userMap.get(data.id);
      //User Exists in map, lets add data
      if (user) {
        Object.assign(user, data);
      }
      else {
        const newUser = new User();
        Object.assign(newUser, data)
        this._userMap.set(data.id, newUser)
      }
    }
    else {
      //No ID, this is Orphaned Data
    }
  }
}
