import { ChangeDetectorRef, Component } from '@angular/core';
import { Todo } from './todo';
import { todoList } from './todoList';
import { BackendService } from './services/backend.service';

import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogOverviewExampleDialog } from './dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  todoDescription :string="";
  list=new todoList("Juan",[]);
  constructor(private changeDetectorRefs: ChangeDetectorRef,private backendService:BackendService
    ,public dialog: MatDialog,private dialogComponent:DialogOverviewExampleDialog){
    this.backendService.getTodos().subscribe(
      success=>{
        console.log(success);
        const todos:Todo[]|undefined=[];
        success.forEach((todo:any)=>{
          const  newTodo = new Todo(todo.description,todo.createdAt)
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
    });
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
