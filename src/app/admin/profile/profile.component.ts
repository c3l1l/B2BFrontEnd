import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { AdminDecodeService } from '../login/service/admin-decode.service';
import { AuthService } from '../login/service/auth.service';
import { UserModel } from './models/user-model';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userId:number=0;
  userName:string="";

constructor(private toastr:ToastrService,private userService:UserService,private adminDecodeService:AdminDecodeService,private authService:AuthService,private errorService:ErrorService){}

ngOnInit():void{
this.getUserId();
this.getUserName();
}
getUserId(){
  this.userId=this.adminDecodeService.getUserId();
}
getUserName(){
  this.userName=this.adminDecodeService.getUserName();
}

update(updateForm:any){
  let user:UserModel=new UserModel();
  user.id=this.userId;
  user.name=this.userName;
  user.password=updateForm.value.password;
  user.newPassword=updateForm.value.newPassword;

  this.userService.update(user).subscribe((res)=>{
    this.toastr.info("Kullanici bilgileri guncellendi. Tekrar giris yapmalisiniz !");
    this.authService.logout();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}


}
