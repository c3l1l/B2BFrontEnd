import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductImageModel } from '../models/product-image-model';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(productId:number){
    let api=this.apiUrl+"ProductImages/GetListByProductId/"+productId;
    return this.httpClient.get(api);
  }
  add(formData:any){
    let api=this.apiUrl+"ProductImages/add";
    return this.httpClient.post(api,formData);
  }
  delete(productImage:ProductImageModel){
    let api=this.apiUrl+"ProductImages/delete";
    return this.httpClient.post(api,productImage);
  }
  setMainImage(id:number){
    let api=this.apiUrl+"ProductImages/SetMainImage/"+id;
    return this.httpClient.get(api);
  }
}
