import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { PriceListModel } from '../price-lists/models/price-list-model';
import { PriceListService } from '../price-lists/service/price-list.service';
import { ProductModel } from '../products/models/product-model';
import { CustomerModel } from './models/customer-model';
import { CustomerRelationshipModel } from './models/customer-relationship-model';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers:CustomerModel[]=[];
  priceLists:PriceListModel[]=[];
  customer:CustomerModel=new CustomerModel();
  
  filterText:string="";
  
  constructor(private customerService:CustomerService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService,private priceListService:PriceListService){}
  
  
  ngOnInit():void{
    this.getList();
    this.getPriceList();
  }
  
  exportExcel(){
    let element=document.getElementById("excel-table");
    let title="Musteri Listesi";
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
    this.customerService.getList().subscribe((res:any)=>{
      this.customers=res.data;
      console.log(res);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  getPriceList(){
    this.priceListService.getList().subscribe((res:any)=>{
      this.priceLists=res.data;
      
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  delete(customer:CustomerModel){
   this.customerService.delete(customer).subscribe((res:any)=>{
      this.toastr.info(res.message)
      this.getList()
   },(err)=>{
    this.errorService.errorHandler(err);
   })
  
  }
  
  add(addForm:NgForm){
    let customer:CustomerModel=new CustomerModel();
    customer.name=addForm.value.name;
    customer.email=addForm.value.email;
    customer.password=addForm.value.password;
  
    this.customerService.add(customer).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
      addForm.reset();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  getCustomer(customer:CustomerModel){
    this.customerService.getDtoById(customer.id).subscribe((res:any)=>{
      console.log(res);

      this.customer=res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }
  update(){ 
  
    this.customerService.update(this.customer).subscribe((res:any)=>{
      this.toastr.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }

  updateRelationship(){   
    let model:CustomerRelationshipModel=new CustomerRelationshipModel();
    model.customerId=this.customer.id;
    model.priceListId=this.customer.priceListId;
    model.discount=this.customer.discount;
    this.customerService.updateRelationship(model).subscribe((res:any)=>{
      this.toastr.info(res.message);
      this.getList();
      document.getElementById("updateRelationshipModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
  changePassword(password:any){ 
    let customer=new CustomerModel();
    customer.id=this.customer.id;
    customer.password=password.value;
    this.customerService.changePasswordByAdminPanel(customer).subscribe((res:any)=>{
      this.toastr.info(res.message);
      this.getList();
      document.getElementById("updatePasswordModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
  
  
}
