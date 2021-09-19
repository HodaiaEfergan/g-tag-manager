import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {HttpService} from '../../../service/http/http.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../../service/dialog/dialog.service';
import {FormControl} from '@angular/forms';

///hfg
@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.scss']
})
export class EditCreateUserComponent extends BaseComponent {

  userId;

  isNew;
  user;
  isManager;
  isOwner;
  items: Object = new FormControl();
  isUser;


  userUnits: any = [];
  newUnitId;


  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
  }

  ngOnInit(): void {

    this.userId = this.activatedRoute.snapshot.queryParams.id;

    if (this.userId) {
      this.isNew = false;
      this.loadData();
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

  async loadData() {
    this.user = await this.httpService.getOneUser(this.userId);
    console.log(this.user);

    let allUnits: any = await this.httpService.getAllUnits();
    console.log(allUnits);
    this.userUnits = allUnits.filter(u => u.user?._id === this.userId);
    this.isManager = this.user.role === 'manager';
  }

  async save() {
    if (this.isManager && this.isOwner) {
      this.dialogService.showOkDialog('you cant be manager and owner both');
      return;
    }
    if (this.user.isLocked) {
      let isYes = await this.dialogService.showYesNoDialog('Are you sure you want lock this user?');
      if (isYes) {
        this.user.isLocked = true;
        console.log(this.user);

      } else {
        this.user.isLocked = false;
        console.log(this.user);
        return;
      }

    }
    if (this.isManager) {
      this.user.role = 'manager';
    }
    if (this.isOwner) {
      this.user.role = 'owner';
    }
    if (this.isUser) {
      this.user.role = 'user';
    }


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

  async relateUnit() {
    if (!this.newUnitId) {
      return;
    }

    try {
      await this.httpService.relateUnitToUser(this.newUnitId, this.userId, false);
      this.loadData();
    } catch (e) {
      console.error(e);
      this.dialogService.showOkDialog('Unit was not found');
    }

    this.newUnitId = '';

  }

  async unrelateUnit(unitId) {
    let isYes = await this.dialogService.showYesNoDialog('Are you sure?');
    if (!isYes) {
      return;
    }


    try {
      await this.httpService.relateUnitToUser(unitId, null, true);
      this.loadData();
    } catch (e) {
      console.error(e);
      this.dialogService.showOkDialog('Unit was not found');
    }
  }
}
