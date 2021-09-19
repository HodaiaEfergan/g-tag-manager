import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Unit} from 'src/app/models/unit';
import {HttpService} from '../../service/http/http.service';
import * as XLSX from 'xlsx';
import {BaseComponent} from '../base-component';
import {DialogService} from '../../service/dialog/dialog.service';


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent extends BaseComponent implements OnInit {
  myForm: FormGroup;

  items: any = [];
  unit;

  /*name of the excel-file which will be downloaded. */
  fileName = 'ExcelSheet.xlsx';

  unitList: Object;

  constructor(httpService: HttpService, private router: Router, private dialogService: DialogService) {
    super(httpService);
  }
  async loadUnit(unitId) {
    this.unit = await this.httpService.getUnit(unitId);
    console.log(this.unit);
    this.unitList=await this.httpService.getAllUnits();

  }
//test-manager
  ngOnInit(): void {
    this.loadData();
    this.myForm = new FormGroup(
      {
        Color: new FormControl(),
        name: new FormControl(),
        unitId: new FormControl(),
        user: new FormControl(),

      });
    this.loadData();
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
  async delete(unit) {
    await this.httpService.deleteUnit(unit);
    await this.dialogService.showYesNoDialog("Are you sure?");
    await this.loadData();

  }
  async edit(unit) {
    await this.httpService.deleteUnit(unit);
    await this.dialogService.showYesNoDialog("Are you sure?");
    await this.loadData();

  }




  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  async save() {
      try {
        await this.httpService.editUser(this.unit._id, this.unit);
        this.dialogService.showOkDialog('User was successfully Updated!');
      } catch (e) {
        this.dialogService.showOkDialog('There was an error, please try again later');
      }
    }

  async okDialog(message) {
    this.dialogService.showOkDialog('this is ok!');
  }

  async yesNoDialog(message) {
    let isYes = await this.dialogService.showYesNoDialog(message);


  }
}


