import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(orderId:number){
    let api=this.apiUrl+"OrderDetails/GetListDto/"+orderId;
    return this.httpClient.get(api);
  }
 
}
