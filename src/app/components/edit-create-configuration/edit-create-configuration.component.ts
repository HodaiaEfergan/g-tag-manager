import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base-component';
import {HttpService} from '../../service/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogService} from '../../service/dialog/dialog.service';
import {Location} from '@angular/common';

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


  constructor(httpService: HttpService, private  activatedRoute: ActivatedRoute, private  dialogService: DialogService, private location: Location) {
    super(httpService);
  }

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
        console.log(this.config);
        this.afterDataLoaded();
        // init config unit
      });
    }


    this.httpService.getUserUnits('').then(units => {
      this.units = units;
      console.log(this.units);
      this.afterDataLoaded();
      // update all current related units
      /*if (!this.isNew) {
        this.relatedUnits = this.units.filter(u => u.configuration === this.config._id);
      }*/
    });
  }

  afterDataLoaded() {
    if (this.units.length == 0 || !this.config) {
      return;
    }

    // we have config and units
    this.units.forEach(u => {
      u.selected = u.configuration._id === this.config._id && (u.configuration._id);
    });

    console.log(this.units);

  }


  async save() {
    console.log(this.config);

    let res;
    if (this.isNew) {
      res = await this.httpService.createNewConfig(this.config);
    } else {
      res = await this.httpService.editNewConfig(this.config._id, this.config);
    }

    console.log(res.data);
    // relate units (take all selected unit and those who just removed from current configuration)
    let unitsToRelate = this.units.filter(u => u.selected || (!u.selected && u.configuration._id === this.config._id));
    let relateResponse = await this.httpService.relateUnits(unitsToRelate, res['data']['_id']);

    this.dialogService.showOkDialog('Configuration was successfully saved!');
    return;


  }


  async delete() {
    let isYes = await this.dialogService.showYesNoDialog('Do you want to delete this config?');
    if (!isYes) {
      return;
    }
    await this.httpService.deleteConfiguration(this.config._id);
    this.location.back();
  }
}
