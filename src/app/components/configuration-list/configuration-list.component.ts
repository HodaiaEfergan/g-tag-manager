import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../base-component";
import {Unit} from "../../models/unit";
import {HttpService} from "../../service/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../service/dialog/dialog.service";
import {config} from "rxjs";

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent extends BaseComponent implements OnInit {

  items: any = [];
user;

  unitList: Array<Unit>;
  constructor(httpService: HttpService,private router: Router, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService) {
    super(httpService);
    this.user = JSON.parse(localStorage.getItem('user'));
  }




  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let res = await this.httpService.getAllConfiguration();
      //let res1 = await this.httpService.getByCreator(this.user.name);
      this.items = res;
      console.log(this.items);
    } catch (e) {
      console.log("res1");
      console.log(e);
    }

  }
  async delete(config) {
    await this.httpService.deleteOne(config);
    await this.dialogService.showYesNoDialog("Are you sure?");
    this.loadData();

  }

}
