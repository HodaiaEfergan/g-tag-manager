import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../base-component";
import {Unit} from "../../models/unit";
import {HttpService} from "../../service/http/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent extends BaseComponent implements OnInit {

  items: any = [];


  unitList: Array<Unit>;

  constructor(httpService: HttpService, private router: Router) {
    super(httpService);
  }



  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let res = await this.httpService.getAllConfiguration();
      this.items = res;
      console.log(this.items);
    } catch (e) {
      console.log(e);
    }

  }

}
