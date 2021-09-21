import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url to be used to fetech from api
  uri: string = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http: HttpClient) {

   }

   // method to fetch all the users
   getUsers(){
     return this.http.get(this.uri)
   }
}
