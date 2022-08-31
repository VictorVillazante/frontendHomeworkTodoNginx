import { ChangeDetectorRef, Component, Optional } from '@angular/core';
import { Todo } from './todo';

import {Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:Todo,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}