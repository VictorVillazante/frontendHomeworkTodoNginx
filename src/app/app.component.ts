import { ChangeDetectorRef, Component } from '@angular/core';
import { Todo } from './todo';
import { todoList } from './todoList';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  todoDescription :String="";
  list=new todoList("Juan",[]);
  constructor(private changeDetectorRefs: ChangeDetectorRef,private backendService:BackendService){
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
      }
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
