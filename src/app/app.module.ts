import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    BrowserModule,
    SweetAlert2Module.forRoot(),
   // ToastrModule  
    ToastrModule.forRoot({
      closeButton:true,
      progressBar:true
})
  ],
  providers: [
    { provide:'apiUrl',useValue:'https://localhost:7146/api/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
