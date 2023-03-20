import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../products/models/product-model';
import { OrderModel } from './models/order-model';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders:OrderModel[]=[];
order:OrderModel=new OrderModel();

statusText:string="Tumu";
filterText:string="";

constructor(private orderService:OrderService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService){}


ngOnInit():void{
  this.getList();
}

exportExcel(){
  let element=document.getElementById("excel-table");
  let title="Siparisler";
  this.helperService.exportExcel(element,title);
}


getList(){
  this.orderService.getList().subscribe((res:any)=>{
    this.orders=res.data;
    
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

update(order:OrderModel,status:string){ 

  order.status=status;
  this.orderService.update(order).subscribe((res:any)=>{
    this.toastr.info(res.message);
    this.getList();
  },(err)=>{
    this.errorService.errorHandler(err);
  });
}

getStatus(event:any){
 // console.log(event.target.value);
  console.log(this.statusText);
}

}
