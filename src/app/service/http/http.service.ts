import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isNullOrUndefined} from 'util';
import { Unit } from 'src/app/models/unit';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL_TEST = 'http://localhost:3000/api/';
  URL_LIVE = 'https://gtag930.herokuapp.com/api/';

  baseUrl = this.URL_LIVE;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
      // 'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  currentUnits: Array<Unit>
  
  constructor(private http: HttpClient) {
  }

  // login
  login(email, password) {
    return this.http.post(this.baseUrl + 'login', {
      email,
      password
    }).toPromise();
  }

  //register
  register(email, password) {
    return this.http.post(this.baseUrl + 'register', {
      email,
      password
    }).toPromise();
  }

  getUnit(unitId) {
    return this.http.get(this.baseUrl + 'units/' + unitId,).toPromise();
  }

  getUserUnits() {
    return this.http.get(this.baseUrl + 'units').toPromise();
  }

  getUnitScanData(unitId) {
    return this.http.get(this.baseUrl + 'units/' + unitId + '/scans').toPromise();
  }

  getReleventUnits(data) {
    return this.http.get(this.baseUrl + 'releventUnits', data);
  }


}
