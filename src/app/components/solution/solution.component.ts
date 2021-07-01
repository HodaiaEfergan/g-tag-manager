import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unit } from 'src/app/models/unit';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  
    currentUnits: Array<Unit>
    constructor(private httpService: HttpService, private router: Router) { }
  
    ngOnInit() {
      this.currentUnits = this.httpService.currentUnits
    }
    
}
