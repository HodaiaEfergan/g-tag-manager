import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../service/dialog/dialog.service";
import {BaseComponent} from "../base-component";

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent extends BaseComponent {
  unitId;
  unit;
  name;
  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
  }

  ngOnInit(): void {

    let unitId = this.activatedRoute.snapshot.queryParams.id;
    this.loadUnit(unitId);
    }




  async loadUnit(unitId) {
    this.unit = await this.httpService.getUnit(unitId);
    console.log(this.unit);

  }
  async save() {
    this.unit.name=this.name;

      try {
        await this.httpService.editUnit(this.unit._id, this.unit);
        this.dialogService.showOkDialog('Unit was successfully Updated!');
      } catch (e) {
        this.dialogService.showOkDialog('There was an error, please try again later');
      }
    }


}
