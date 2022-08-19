import { Todo } from "./todo";

export class todoList{
    constructor(public user:String, public todos:Todo[]=[]){

    }
    getTodos(){
        return this.todos;
    }
    addTodos(description:String){
        this.todos.push(new Todo(description));
    }
}