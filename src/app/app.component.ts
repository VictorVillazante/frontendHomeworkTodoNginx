import { ChangeDetectorRef, Component } from '@angular/core';
import { Todo } from './todo';
import { todoList } from './todoList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  todoDescription :String="";
  list=new todoList("Juan",[
    new Todo("Probando tabla"),
    new Todo("Dockerfile", true)
  ]);
  constructor(private changeDetectorRefs: ChangeDetectorRef){

  }
  addTodo(description:String){
    console.log(description);
    if(description!=''){
      this.list.addTodos(description);
      console.log(this.list);
      this.changeDetectorRefs.detectChanges();
    }
  }
  getTodo(){
    return this.list.todos.filter(todo=>!todo.completed);
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
