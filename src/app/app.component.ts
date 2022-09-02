import { ChangeDetectorRef, Component } from '@angular/core';
import { Todo } from './todo';
import { todoList } from './todoList';
import { BackendService } from './services/backend.service';

import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogOverviewExampleDialog } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  todoDescription :string="";
  list=new todoList("Juan",[]);
  constructor(private dialogOverviewExampleDialog:DialogOverviewExampleDialog,private changeDetectorRefs: ChangeDetectorRef,private backendService:BackendService
    ,public dialog: MatDialog){
    this.getTodos();
  }
  getTodos(){
    this.backendService.getTodos().subscribe(
      success=>{
        console.log(success);
        const todos:Todo[]|undefined=[];
        success.forEach((todo:any)=>{
          const  newTodo = new Todo(todo.id,todo.description,todo.createdAt)
          todos.push(newTodo);
        });
        this.list=new todoList("PEPITTO",todos);
      },
      error=>{
        console.log(error);
      }
    );
  }
  openDialog(todo:Todo): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: todo,
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.todoDescription = result;
        this.getTodos();  
      });
    }
    swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  deleteTodo(id:any){
    console.log(id);
    this.swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.backendService.deleteTodo(id).subscribe(
          ()=>{
            console.log("Confirmacion de eliminacion")
            this.swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getTodos();            
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  addTodo(description:String){
    console.log(description);
    var body={
      description:description
    }
    this.backendService.saveTodo(body).subscribe(
      success=>{
        console.log(success);
        this.list.addNewTodo(success);
      },error=>{
        console.log(error);
      },
    )
    /*if(description!=''){
      this.list.addTodos(description,(new Date).toString());
      console.log(this.list);
      this.changeDetectorRefs.detectChanges();
    }*/
  }
  getTodo(){
    return this.list.todos.filter(todo=>!todo.completed);
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
