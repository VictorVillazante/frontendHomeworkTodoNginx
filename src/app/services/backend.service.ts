import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backendUrl=Config.url+"";
  constructor(private http:HttpClient) { 

  }
  getTodos(){
    return this.http.get<any>(this.backendUrl+'/v1/api/todo');
  }
  saveTodo(body:any){
    return this.http.post<any>(this.backendUrl+'/v1/api/todo',body);
  }
}
