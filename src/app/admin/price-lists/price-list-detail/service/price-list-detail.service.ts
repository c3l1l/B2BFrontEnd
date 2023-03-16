import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListModel } from '../../models/price-list-model';
import { PriceListDetailModel } from '../model/price-list-detail-model';

@Injectable({
  providedIn: 'root'
})
export class PriceListDetailService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(priceListId:number){
    let api=this.apiUrl+"PriceListsDetails/GetList"+priceListId;
    return this.httpClient.get(api);
  }
  getById(id:number){
    let api=this.apiUrl+"PriceListsDetails/GetById/"+id;
    return this.httpClient.get(api);
  }
  delete(priceListDetail:PriceListDetailModel){
    let api=this.apiUrl+"PriceListsDetails/Delete";
    return this.httpClient.post(api,priceListDetail);
  }
  add(priceListDetail:PriceListDetailModel){
    let api=this.apiUrl+"PriceListsDetails/Add";
    return this.httpClient.post(api,priceListDetail);
  }
  update(priceListDetail:PriceListDetailModel){
    let api=this.apiUrl+"PriceListsDetails/Update";
    return this.httpClient.post(api,priceListDetail);
  }
  
}

