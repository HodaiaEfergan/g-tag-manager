import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  token;
  password;

  constructor(private  httpService: HttpService, private  activatedRoute: ActivatedRoute, private dialogService: DialogService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams.token;
    console.log('token is:', this.token);
  }

  async send() {
    let res = await this.httpService.resetPassword(this.token, this.password);

    const token = res['data']['token'];
    const user = res['data']['user'];
    const role = res['data']['user']['role'];
    console.log('token is: ' + token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    this.router.navigateByUrl('/');
  }

}
