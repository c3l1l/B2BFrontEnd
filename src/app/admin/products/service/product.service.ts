import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(){
    let api=this.apiUrl+"Products/GetList";
    return this.httpClient.get(api);
  }
  getById(productId:number){
    let api=this.apiUrl+"Products/GetById/"+productId;
    return this.httpClient.get(api);
  }
  delete(product:ProductModel){
    let api=this.apiUrl+"Products/Delete";
    return this.httpClient.post(api,product);
  }
  add(product:ProductModel){
    let api=this.apiUrl+"Products/Add";
    return this.httpClient.post(api,product);
  }
  update(product:ProductModel){
    let api=this.apiUrl+"Products/Update";
    return this.httpClient.post(api,product);
  }
  
  

}
