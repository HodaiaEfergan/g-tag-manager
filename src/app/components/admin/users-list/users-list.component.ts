import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {HttpService} from '../../../service/http/http.service';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../../service/dialog/dialog.service";
import {MatListModule} from '@angular/material/list';
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseComponent {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  userUnits: any = [];
  newUnitId;
  userId;
  usersCompany:any=[];
  company: any;




  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
    this.loadData();
  }





  async loadData() {

    this.users = await this.httpService.getAllUsers();
    console.log(this.users);

    let allUnits: any = await this.httpService.getAllUnits();
    console.log(allUnits);
    this.userUnits = allUnits;

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


  async save() {
    try {
      await this.httpService.editOneCompany(this.company._id, this.company);
      this.dialogService.showOkDialog('Users were successfully Updated!');
    } catch (e) {
      this.dialogService.showOkDialog('There was an error, please try again later');
    }
  }

}
