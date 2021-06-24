import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  items: any = [];

  constructor(private  httpService: HttpService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let res = await this.httpService.getUserUnits();
      this.items = res;
      console.log(this.items);
    } catch (e) {
      console.log(e);
    }


  }

}
