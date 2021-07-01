import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Unit} from 'src/app/models/unit';
import {HttpService} from '../../service/http/http.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as XLSX from 'xlsx';
import {BaseComponent} from '../base-component';


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent extends BaseComponent implements OnInit {
  myForm: FormGroup;

  items: any = [];

  /*name of the excel-file which will be downloaded. */
  fileName = 'ExcelSheet.xlsx';

  unitList: Array<Unit>;

  constructor(httpService: HttpService, private router: Router) {
    super(httpService);
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

}


