import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base-component';
import {HttpService} from '../../service/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-create-configuration',
  templateUrl: './edit-create-configuration.component.html',
  styleUrls: ['./edit-create-configuration.component.scss']
})
export class EditCreateConfigurationComponent extends BaseComponent implements OnInit {
  items: any = [];

  config;
  isNew;
  units: any = [];
  relatedUnits: any = [];


  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute) {
    super(httpService);
  }

//test-manager
  myForm: any;

  ngOnInit(): void {

    // check if edit or create
    let configId = this.activatedRoute.snapshot.queryParams.id;
    if (!configId) {
      console.log('create new config');
      this.config = {
        name: '',
        enabled: true,
        alertMethods: {
          sms: {
            enabled: false,
            phone: ''
          },
          email: {
            enabled: false,
            email: ''
          }
        },
        cpuTemp: {
          enabled: true,
          min: 20,
          max: 40
        },
        lowBat: {
          enabled: true,
          value: 20
        }
      };
      this.isNew = true;
    } else {
      console.log('edit config');
      this.isNew = false;
      this.httpService.getOneConfig(configId).then(data => {
        this.config = data;
      });
    }


    this.httpService.getUserUnits('').then(units => {
      this.units = units;
      // update all current related units
      if (!this.isNew) {
        this.relatedUnits = this.units.filter(u => u.configuration === this.config._id);
      }
    });


  }


  async save() {
    console.log(this.config);

    if (this.isNew) {
      let res = await this.httpService.createNewConfig(this.config);
      console.log(res);
      return;
    }

    let res = await this.httpService.editNewConfig(this.config._id, this.config);
    console.log(res);


  }

  isUnitRelated(id) {
    return this.relatedUnits.indexOf(id) > -1;
  }

  toggleRelatedUnit(id) {
    if(this.isUnitRelated(id)){
      this.relatedUnits.splice(this.relatedUnits.indexOf(id),1);
      return;
    }
    this.relatedUnits.push(id);
  }
}
