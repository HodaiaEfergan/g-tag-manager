import {OnInit} from '@angular/core';
import {HttpService} from '../service/http/http.service';

export abstract class BaseComponent implements OnInit {

  sortKey = 'unitId'; // 'unitId', '-unitId';


  protected constructor(public httpService: HttpService) {

  }


  ngOnInit(): void {
  }


  loadData() {

  }

  /********   sorting mechanism  ***********/

  setSort(sortBy) {
    if (this.isSameSortValue(sortBy, this.sortKey)) {
      this.sortKey = this.toggleSortValue(this.sortKey);
      console.log(`sorting by ${this.sortKey}`);

    } else {
      this.sortKey = sortBy;
    }

    this.loadData();
  }

  isSameSortValue = (v1, v2) => v1.replace('-', '') === v2.replace('-', '');

  toggleSortValue = (v) => v.startsWith('-') ? v.replace('-', '') : ('-' + v);

  getSortIcon(sortKey) {
    if (!this.isSameSortValue(this.sortKey, sortKey)) {
      return '';
    }
    return this.sortKey.startsWith('-') ? 'expand_more' : 'expand_less';
  }

}
