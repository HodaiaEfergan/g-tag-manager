import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  role;

  constructor() {
    this.role = localStorage.getItem('role') || 'user';
  }

  ngOnInit(): void {
  }

}
