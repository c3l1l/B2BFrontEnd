import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../../products/models/product-model';
import { PriceListDetailModel } from './model/price-list-detail-model';
import { PriceListDetailService } from './service/price-list-detail.service';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent {
  priceListDetails:PriceListDetailModel[]=[];
  priceListDetail:PriceListDetailModel=new PriceListDetailModel();
  
  filterText:string="";
  priceListId:number=0;
  constructor(private priceListDetailService:PriceListDetailService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService,private activatedRoute:ActivatedRoute){}
  
  
  ngOnInit():void{
    this.activatedRoute.params.subscribe((res:any)=>{
        this.priceListId= res.id
        this.getList();
    })
   
  }
  
  exportExcel(){
    let element=document.getElementById("excel-table");
    let title="Fiyat Listesi Detayi";
    this.helperService.exportExcel(element,title);
  }
  
  // successNotification() {
  //   Swal.fire('Hi', 'We have been informed!', 'success');
  // }
  // deleteConfirmation(product:ProductModel) {
  //   Swal.fire({
  //     title: 'Are you sure to delete this?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.delete(product);
  //       Swal.fire('Removed!', 'Product removed successfully.', 'success');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'Product still in our database.)', 'error');
  //     }
  //   });
  // }
  
  getList(){
    this.priceListDetailService.getList(this.priceListId).subscribe((res:any)=>{
      this.priceListDetail=res.data;
      
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  delete(priceListDetail:PriceListDetailModel){
   this.priceListDetailService.delete(priceListDetail).subscribe((res:any)=>{
      this.toastr.info(res.message)
      this.getList()
   },(err)=>{
    this.errorService.errorHandler(err);
   })  
  }
  
  add(addForm:NgForm){
    // let product:ProductModel=new ProductModel();
    // product.name=addForm.value.productName;
    // product.id=0;
  
    // this.priceListService.add(product).subscribe((res:any)=>{
    //   this.toastr.success(res.message);
    //   this.getList();
    //   addForm.reset();
    // },(err)=>{
    //   this.errorService.errorHandler(err);
    // })
  }
  getPriceListDetail(priceListDetail:PriceListDetailModel){
    this.priceListDetailService.getById(priceListDetail.id).subscribe((res:any)=>{
      this.priceListDetail=res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  update(){ 
  
    this.priceListDetailService.update(this.priceListDetail).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}
