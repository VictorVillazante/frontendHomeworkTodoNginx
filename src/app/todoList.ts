import { Todo } from "./todo";

export class todoList{
    constructor(public user:String, public todos:Todo[]=[]){

    }
    getTodos(){
        return this.todos;
    }
    addTodos(todo:Todo){
        this.todos.push(todo);
    }
    addNewTodo(todo:Todo){
        this.todos.push(todo);
    }
}