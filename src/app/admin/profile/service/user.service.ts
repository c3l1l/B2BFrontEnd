import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  update(user:UserModel){
    let api=this.apiUrl + "Users/UpdateUserByAdminPanel";
    return this.httpClient.post(api,user);
  }

}
