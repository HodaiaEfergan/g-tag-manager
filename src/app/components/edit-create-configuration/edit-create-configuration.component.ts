import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../base-component";
import {HttpService} from "../../service/http/http.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-create-configuration',
  templateUrl: './edit-create-configuration.component.html',
  styleUrls: ['./edit-create-configuration.component.scss']
})
export class EditCreateConfigurationComponent extends BaseComponent implements OnInit {
  items: any = [];

  constructor(httpService: HttpService, private router: Router) {
    super(httpService);
  }

//test-manager
  myForm: any;
  ngOnInit(): void {

    this.loadData();
    this.myForm = new FormGroup(
      {
        email: new FormControl(),
        call: new FormControl(),
        sms: new FormControl(),
        maxTemp: new FormControl(),
        minBattery: new FormControl(),

      })
  }

  async loadData() {
    try {
      let res = await this.httpService.getUserUnits(this.sortKey);
      this.items = res;
      console.log(this.items);
    } catch (e) {
      console.log(e);
    }

  }
  Submit() {
    console.log(this.myForm.value)
    this.httpService.createOne(this.myForm.value)

  }
}
