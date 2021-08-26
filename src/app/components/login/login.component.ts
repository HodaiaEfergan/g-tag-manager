import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog/dialog.service';
import {BaseComponent} from "../base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  email = '';
  pasword;
  forgotEmail;
  errorMessage: any;
  forgotPasswordClicked = false;
  user;


  constructor(httpService: HttpService,private router: Router, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService, private location: Location) {
    super(httpService);
  }
  // constructor(private  httpService: HttpService, private router: Router, private  dialogService: DialogService) {
  //   }

  ngOnInit(): void {

    let userId = this.activatedRoute.snapshot.queryParams.id;

      this.user = {
        name: '',
        email: '',
        password: '',
        role: 'user',
        isLocked: false,
      };
    }





  async login() {
    console.log('ddsfs');
    if (!this.email || !this.pasword) {
      this.dialogService.showOkDialog("email or password not found")
      return;
    }


    try {
      let loginResponse = await this.httpService.login(this.email, this.pasword);
      console.log(loginResponse);
      const token = loginResponse['data']['token'];
      const user = loginResponse['data']['user'];
      const role = loginResponse['data']['user']['role'];
      this.user.isLocked=user.isLocked;
      if(user.isLocked){
        this.dialogService.showOkDialog("the owner locked your account")
        return;
      }
      console.log('token is: ' + token);
      console.log(user.role);
      console.log(this.user.isLocked);
      console.log(user.isLocked); //from db
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      await this.router.navigateByUrl('/');
    } catch (e) {
      this.dialogService.showOkDialog("email or password not found")
      console.log('login error', e);
    }

  }

//register
  async register() {
    if (!this.email || !this.pasword) {
      this.dialogService.showOkDialog("please enter password and email")
      return;
    }
    try {

      let registerResponse = await this.httpService.register(this.email, this.pasword);
      console.log(registerResponse);
      const token = registerResponse['token'];
      this.dialogService.showOkDialog("register succses")
      console.log('token is: ' + token);
      localStorage.setItem('token', token);

      //await this.router.navigateByUrl('/');
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
