import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent implements OnInit {

  message;

  constructor(public dialogRef: MatDialogRef<OkDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
