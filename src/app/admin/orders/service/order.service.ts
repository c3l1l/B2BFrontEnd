import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(){
    let api=this.apiUrl+"Orders/GetListDto";
    return this.httpClient.get(api);
  } 
  getById(id:number){
    let api=this.apiUrl+"Orders/GetByIdDto/"+id;
    return this.httpClient.get(api);
  }
  
  update(order:OrderModel){
    let api=this.apiUrl+"Orders/Update";
    return this.httpClient.post(api,order);
  }
}
