import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {isNullOrUndefined} from 'util';
import {Unit} from 'src/app/models/unit';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // test2

  URL_TEST = 'http://localhost:3001/api/';
  URL_LIVE = 'https://80.178.184.236:3001/api/';
  //URL_LIVE = 'https://set930.herokuapp.com/api/';


  baseUrl = this.URL_LIVE;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
       'Access-Control-Allow-Origin': 'https://localhost:4200'
    })
  };

  currentUnits: Array<Unit>;

  constructor(private https: HttpClient) {

    // this.baseUrl = isDevMode() ? this.URL_TEST : this.URL_LIVE;
  }

  // login
  login(email, password) {
    return this.https.post(this.baseUrl + 'login', {
      email,
      password
    }).toPromise();
  }

  //register
  register(email, password) {
    return this.https.post(this.baseUrl + 'register', {
      email,
      password
    }).toPromise();

  }

  forgotPassword(email) {
    return this.https.post(this.baseUrl + 'forgot-password', {
      email,
    }).toPromise();
  }


  resetPassword(token, password) {
    return this.https.post(this.baseUrl + 'reset-password', {
      token,
      newPassword: password
    }).toPromise();
  }

  sample(data) {

    /* http://localhost:3000/api/sample?data=UIDXYZUBAT4220MVOLINDExt_ONURSSI21,9
       NETCON"Partner"MCUTMPTPM40.00EXTTMPTPS31.65LOC$GPGGA,114625.715,
       ,,,,0,00,,,M,0.0,M,,0000*50
     $SPEEDTAGSTID43TRSSI-51,TID48TRSSI-73,TID35TRSSI-55,TID29TRSSI-56,*/

    return this.https.get(this.baseUrl + 'sample?data=' + data).toPromise();
  }

  getUnit(unitId) {
    return this.https.get(this.baseUrl + 'units/' + unitId,).toPromise();
  }

  getUserUnits(sortKey) {
    return this.https.get(this.baseUrl + 'units?sortBy=' + sortKey).toPromise();
  }

  getUnitScanData(unitId) {
    return this.https.get(this.baseUrl + 'units/' + unitId + '/scans').toPromise();
  }

  SendEmail() {
    return this.https.get(this.baseUrl + 'units/').toPromise();
  }

  deleteScanData(id) {
    return this.https.delete(this.baseUrl + 'scan-data/' + id).toPromise();
  }


  // users methods
  getAllUsers() {
    return this.https.get(this.baseUrl + 'users').toPromise();
  }

  getOneUser(id) {
    return this.https.get(this.baseUrl + 'users/' + id).toPromise();
  }

  editUser(id, user) {
    return this.https.put(this.baseUrl + 'users/' + id, user).toPromise();
  }

  createUser(user) {
    return this.https.post(this.baseUrl + 'users', user).toPromise();
  }

  // config methods
  createNewConfig(config) {
    return this.https.post(this.baseUrl + 'configs', config).toPromise();
  }

  editNewConfig(id, config) {
    return this.https.put(this.baseUrl + 'configs/' + id, config).toPromise();
  }

  deleteConfiguration(id) {
    return this.https.delete(this.baseUrl + 'configs/' + id).toPromise();
  }

  getAllConfiguration() {
    return this.https.get(this.baseUrl + 'configs').toPromise();
  }

  getOneConfig(id) {
    return this.https.get(this.baseUrl + 'configs/' + id).toPromise();
  }


  relateUnits(units, configId) {
    return this.https.put(this.baseUrl + 'units/relate', {units: units, configId: configId}).toPromise();
  }

}
