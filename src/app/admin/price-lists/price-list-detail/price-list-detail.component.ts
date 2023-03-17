import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../../products/models/product-model';
import { ProductService } from '../../products/service/product.service';
import { PriceListDetailModel } from './model/price-list-detail-model';
import { PriceListDetailService } from './service/price-list-detail.service';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent {
  products:ProductModel[]=[];
  priceListDetails:PriceListDetailModel[]=[];
  priceListDetail:PriceListDetailModel=new PriceListDetailModel();
  
  filterText:string="";
  priceListId:number=0;
  constructor(private priceListDetailService:PriceListDetailService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService,private activatedRoute:ActivatedRoute,private productService:ProductService){}
  
  
  ngOnInit():void{
    this.activatedRoute.params.subscribe((res:any)=>{
        this.priceListId= res.id
        this.getList();
        this.getProductList();
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
      this.priceListDetails=res.data;     
      
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

getProductList(){
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
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
    let priceListDetail:PriceListDetailModel=new PriceListDetailModel();
    priceListDetail.productId=addForm.value.productId;
    priceListDetail.price=addForm.value.price;
    priceListDetail.priceListId=this.priceListId;
    priceListDetail.id=0;
    console.log(priceListDetail);
    this.priceListDetailService.add(priceListDetail).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
      addForm.reset();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  update(priceListDetail:PriceListDetailModel){ 
  
    this.priceListDetailService.update(priceListDetail).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}
