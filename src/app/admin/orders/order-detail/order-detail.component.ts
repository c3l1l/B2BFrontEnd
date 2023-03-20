import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { OrderModel } from '../models/order-model';
import { OrderService } from '../service/order.service';
import { OrderDetailModel } from './models/order-detail-model';
import { OrderDetailService } from './service/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  orderDetails:OrderDetailModel[]=[];
orderId:number=0;
order:OrderModel=new OrderModel();

constructor(private activatedRoute:ActivatedRoute,private orderDetailService:OrderDetailService,private errorService:ErrorService,private orderService:OrderService){}

ngOnInit():void{
  this.activatedRoute.params.subscribe((res:any)=>{
    this.orderId=res.id;
    this.getList();
    this.getOrder();
  })
}

getOrder(){
  this.orderService.getById(this.orderId).subscribe((res:any)=>{
    this.order=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}

getList(){
  this.orderDetailService.getList(this.orderId).subscribe((res:any)=>{
    this.orderDetails=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}


}
