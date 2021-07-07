import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {HttpService} from '../../../service/http/http.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../../service/dialog/dialog.service';

@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.scss']
})
export class EditCreateUserComponent extends BaseComponent {

  isNew;
  user;
  isManager;


  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
  }

  ngOnInit(): void {

    let userId = this.activatedRoute.snapshot.queryParams.id;
    if (userId) {
      this.isNew = false;
      this.loadUser(userId);
    } else {
      this.isNew = true;
      this.user = {
        name: '',
        email: '',
        password: '',
        role: 'user',
        isLocked: false,
      };
    }
  }

  async loadUser(userId) {
    this.user = await this.httpService.getOneUser(userId);
    console.log(this.user);
    this.isManager = this.user.role === 'manager';
  }

  async save() {
    this.user.role = this.isManager ? 'manager' : 'user';

    if (this.isNew) {
      try {
        await this.httpService.createUser(this.user);
        this.dialogService.showOkDialog('User was successfully Created!');
      } catch (e) {
        this.dialogService.showOkDialog('There was an error, please try again later');
      }

    } else {
      try {
        await this.httpService.editUser(this.user._id, this.user);
        this.dialogService.showOkDialog('User was successfully Updated!');
      } catch (e) {
        this.dialogService.showOkDialog('There was an error, please try again later');
      }
    }
  }
}