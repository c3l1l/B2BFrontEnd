import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../products/models/product-model';
import { PriceListModel } from './models/price-list-model';
import { PriceListService } from './service/price-list.service';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.scss']
})
export class PriceListsComponent {

priceLists:PriceListModel[]=[];
priceList:PriceListModel=new PriceListModel();

filterText:string="";

constructor(private priceListService:PriceListService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService){}


ngOnInit():void{
  this.getList();
}

exportExcel(){
  let element=document.getElementById("excel-table");
  let title="Fiyat Listeleri";
  this.helperService.exportExcel(element,title);
}

successNotification() {
  Swal.fire('Hi', 'We have been informed!', 'success');
}
deleteConfirmation(product:ProductModel) {
  Swal.fire({
    title: 'Are you sure to delete this?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {
      this.delete(product);
      Swal.fire('Removed!', 'Product removed successfully.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Product still in our database.)', 'error');
    }
  });
}

getList(){
  this.priceListService.getList().subscribe((res:any)=>{
    this.priceLists=res.data;
    
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
delete(priceList:PriceListModel){
 this.priceListService.delete(priceList).subscribe((res:any)=>{
    this.toastr.info(res.message)
    this.getList()
 },(err)=>{
  this.errorService.errorHandler(err);
 })

}

add(addForm:NgForm){
  let priceListModel:PriceListModel=new PriceListModel();
  priceListModel.name=addForm.value.priceListName;
  priceListModel.id=0;

  this.priceListService.add(priceListModel).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    addForm.reset();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
getPriceList(priceList:PriceListModel){
  this.priceListService.getById(priceList.id).subscribe((res:any)=>{
    this.priceList=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
update(){ 

  this.priceListService.update(this.priceList).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    document.getElementById("updateModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
  },(err)=>{
    this.errorService.errorHandler(err);
  });
}


}
