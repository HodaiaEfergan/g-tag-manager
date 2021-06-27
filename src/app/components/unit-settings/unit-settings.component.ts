import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http/http.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-unit-settings',
  templateUrl: './unit-settings.component.html',
  styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {

  unitId;
  unit;

  scanHistory: any = [];


  lineChartData: ChartDataSets[] = [
    {data: [], label: 'CPU temp'},
  ];

  lineChartLabels: Label[] = [
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(46,144,255,0.28)',
    },

  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  getChartData() {
    const data = this.scanHistory.map(i => parseFloat(i.cpuTemp));
    return {data: data, label: 'CPU temp'};
  }

  getChartLabels() {
    return this.scanHistory.map(i => new Date(i.time).toString());
  }

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

      // update chart data

      const newData = this.scanHistory.map(i => parseFloat(i.cpuTemp));
      const newLabels = this.scanHistory.map(i => new Date(i.time).toLocaleTimeString());


      this.lineChartData = [
        {data: newData, label: 'CPU temp'},

      ];

      this.lineChartLabels = newLabels;


    } catch (e) {

    }
  }

}
