import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http/http.service';

@Component({
  selector: 'app-unit-settings',
  templateUrl: './unit-settings.component.html',
  styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {

  unitId;
  unit;

  scanHistory: any = [];

  constructor(private httpService: HttpService, private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.unitId = this.activatedRoute.snapshot.queryParams.id;
    this.loadData();

  }

  async loadData() {
    try {
      // load relevant unit
      this.unit = await this.httpService.getUnit(this.unitId);
      console.log(this.unit);


      // load scan history
      this.scanHistory = await this.httpService.getUnitScanData(this.unit.unitId);
      console.log(this.scanHistory);

    } catch (e) {

    }
  }

}
