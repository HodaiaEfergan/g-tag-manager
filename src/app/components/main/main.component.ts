import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  role;
  user;

  constructor() {
    console.log('test1');
    this.role = localStorage.getItem('role') || 'user';
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

}
