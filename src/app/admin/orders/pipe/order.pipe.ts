import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[],statusText:string, filterText:string): any[] {
    if(filterText==""  && statusText == "Tumu" || filterText==null && statusText == "Tumu" ){
      return value;
    }
    else if(filterText==""  && statusText != "Tumu" || filterText==null && statusText != "Tumu"){
      let returnvalue= value.filter(p=>p.status ==statusText)
     return returnvalue;
    }
 
    let returnvalue= value.filter(p=>p.status ==statusText)

    return returnvalue.filter(p=>{
     const customerName=p.customerName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
     const orderNumber=p.customerNumber.includes(filterText);
     return(customerName + orderNumber)
    });
   }

}
