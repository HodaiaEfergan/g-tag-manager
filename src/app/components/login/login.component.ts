import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {Router} from '@angular/router';
import {DialogService} from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  pasword;
  forgotEmail;
  errorMessage: any;
  forgotPasswordClicked = false;


  constructor(private  httpService: HttpService, private router: Router, private  dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  async login() {
    if (!this.email || !this.pasword) {
      return;
    }
    try {
      let loginResponse = await this.httpService.login(this.email, this.pasword);
      console.log(loginResponse);
      const token = loginResponse['data']['token'];
      const user = loginResponse['data']['user'];
      const role = loginResponse['data']['user']['role'];
      console.log('token is: ' + token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      this.router.navigateByUrl('/');
    } catch (e) {
      console.log('login error', e);
    }

  }

//register
  async register() {
    if (!this.email || !this.pasword) {
      return;
    }
    try {
      let registerResponse = await this.httpService.register(this.email, this.pasword);
      console.log(registerResponse);
      const token = Response['data'];
      console.log('token is: ' + token);
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/');
    } catch (e) {
      console.log('register error', e);
    }

  }

  async forgotPassword() {
    let res = await this.httpService.forgotPassword(this.forgotEmail);
    console.log(res['data']);
    this.dialogService.showOkDialog('Please check your email...');
  }


}
