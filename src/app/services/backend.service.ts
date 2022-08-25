import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { 

  }
  getTodos(){
    return this.http.get<any>('http://localhost:8080/v1/api/todo');
  }
  saveTodo(body:any){
    return this.http.post<any>('http://localhost:8080/v1/api/todo',body);
  }
}
