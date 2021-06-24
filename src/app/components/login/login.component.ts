import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  pasword;


  constructor(private  httpService: HttpService, private router: Router) {
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
      const token = loginResponse['data'];
      console.log('token is: ' + token);
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/');
    } catch (e) {
      console.log('login error', e);
    }

  }

}
