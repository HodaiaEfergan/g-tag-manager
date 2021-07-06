import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';

@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.scss']
})
export class SampleViewComponent implements OnInit {


  /* UIDXYZUBAT4220MVOLINDExt_ONURSSI21,9
     NETCON"Partner"MCUTMPTPM40.00EXTTMPTPS31.65LOC$GPGGA,114625.715,
     ,,,,0,00,,,M,0.0,M,,0000*50
   $SPEEDTAGSTID43TRSSI-51,TID48TRSSI-73,TID35TRSSI-55,TID29TRSSI-56,*/

  @Input()
  unitId;
  voltage;
  isExtVoltageOn;
  unitRSSI;
  netCon;
  cpuTemp;
  snsTemp;


  constructor(private  httpService: HttpService) {
  }

  ngOnInit(): void {
  }

  async send() {
    let data = `UID${this.unitId}UBAT${this.voltage}MVOLINDExt_${this.isExtVoltageOn ? 'ON' : 'OFF'}URSSI${this.unitRSSI}
     NETCON"${this.netCon}"MCUTMPTPM${this.cpuTemp}EXTTMPTPS${this.snsTemp}LOC$GPGGA,114625.715,
     ,,,,0,00,,,M,0.0,M,,0000*50
   $SPEEDTAGSTID43TRSSI-51,TID48TRSSI-73,TID35TRSSI-55,TID29TRSSI-56,`;

    this.httpService.sample(data);

  }

}
