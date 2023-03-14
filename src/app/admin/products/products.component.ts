import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './models/product-model';
import { ProductService } from './service/product.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products:ProductModel[]=[];
  filterText:string="";
constructor(private productService:ProductService,private errorService:ErrorService,private toastr:ToastrService){}

ngOnInit():void{
  this.getList();
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
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
    console.log(this.products);
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
delete(product:ProductModel){
 this.productService.delete(product).subscribe((res:any)=>{
    this.toastr.info(res.message)
    this.getList()
 },(err)=>{
  this.errorService.errorHandler(err);
 })
console.log("delete product"+product);
}

}
