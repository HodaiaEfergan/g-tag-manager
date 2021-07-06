import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OkDialogComponent} from '../../components/dialogs/ok-dialog/ok-dialog.component';
import {YesNoDialogComponent} from '../../components/dialogs/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }


  showOkDialog(message) {
    let ref = this.dialog.open(OkDialogComponent, {
      data: {
        message: message
      }
    });
  }

  async showYesNoDialog(message) {

    let ref = this.dialog.open(YesNoDialogComponent, {
      data: {
        message: message
      }
    });
    return await ref.afterClosed().toPromise();
  }

}
