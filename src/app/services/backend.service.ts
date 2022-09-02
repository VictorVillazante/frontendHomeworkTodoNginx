import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  putTodo(body:any){
    return this.http.put<any>(this.backendUrl+'/v1/api/todo',body);
  }
  deleteTodo(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json' // We send JSON
      }),
      responseType: 'text' as 'json'  // We accept plain text as response.
    };
    return this.http.delete<string>(this.backendUrl+"/v1/api/todo/"+id, httpOptions);
  }
}
