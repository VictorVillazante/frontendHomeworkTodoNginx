import {Component, ComponentFactoryResolver, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Todo } from './todo';
import Swal from 'sweetalert2'
import { BackendService } from './services/backend.service';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {
  new:String | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:Todo,private backendService:BackendService
  ) {
    this.new=data.description;
  }
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  onNoClick(): void {
    this.dialogRef.close();
  }
  todoAux:Todo | undefined;

  updateTask():void{
    console.log(this.data);
    this.data.description=this.new+"";
    this.backendService.putTodo(this.data).subscribe(
      success=>{
        console.log("Confirmacion de actualizacion")
        this.swalWithBootstrapButtons.fire(
          'Update!',
          'Your file has been updated.',
          'success'
        )

      },
      error=>{
        console.log("Error");
        console.log(error);
      }
    );
  }
}