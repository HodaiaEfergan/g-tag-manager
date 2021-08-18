import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseComponent {



  constructor(httpService: HttpService) {
    super(httpService);
    this.loadData();
  }

  async loadData() {
    this.users = await this.httpService.getAllUsers();
    console.log(this.users);
  }



}
