import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../../products/models/product-model';
import { PriceListModel } from '../models/price-list-model';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  
  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(){
    let api=this.apiUrl+"PriceLists/GetList";
    return this.httpClient.get(api);
  }
  getById(id:number){
    let api=this.apiUrl+"PriceLists/GetById/"+id;
    return this.httpClient.get(api);
  }
  delete(priceList:PriceListModel){
    let api=this.apiUrl+"PriceLists/Delete";
    return this.httpClient.post(api,priceList);
  }
  add(priceList:PriceListModel){
    let api=this.apiUrl+"PriceLists/Add";
    return this.httpClient.post(api,priceList);
  }
  update(priceList:PriceListModel){
    let api=this.apiUrl+"PriceLists/Update";
    return this.httpClient.post(api,priceList);
  }
  
}
