import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../service/dialog/dialog.service";
import {BaseComponent} from "../base-component";

@Component({
  selector: 'app-edit-create-company',
  templateUrl: './edit-create-company.component.html',
  styleUrls: ['./edit-create-company.component.scss']
})
export class EditCreateCompanyComponent extends BaseComponent {
  company;
  isNew;
  companyId;

  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
  }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.queryParams.id;

    if (this.companyId) {
      this.isNew = false;
      this.loadData();
    } else {
      this.isNew = true;
      this.company = {
        name: '',
        units: [],
        users: [],

      };
    }
  }
    async save() {
     if (this.isNew) {
        try {
          await this.httpService.createCompany(this.company);
          this.dialogService.showOkDialog('Company was successfully Created!');
        } catch (e) {
          this.dialogService.showOkDialog('There was an error, please try again later');
        }

      } else {
        try {
          await this.httpService.editOneCompany(this.company._id, this.company);
          this.dialogService.showOkDialog('Company was successfully Updated!');
        } catch (e) {
          this.dialogService.showOkDialog('There was an error, please try again later');
        }
      }
    }

}
