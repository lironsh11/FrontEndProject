import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], val: string): any[] {
    let arr2=[]
    val = val.toString().toLowerCase();
    if (arr != undefined) {
      
   
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].manufacturer.toLowerCase().includes(val)) {
         arr2.push(arr[i]);
          }

     
          if (arr[i].model.toLowerCase().includes(val)) {
            arr2.push(arr[i]);
             }    

             if (arr[i].gearType.toLowerCase().includes(val)) {
              arr2.push(arr[i]);
               }   
               if (arr[i].manufacturerYear.toLowerCase().includes(val)) {
                arr2.push(arr[i]);
                 }  

              
              
          if(val == ""){
            return arr
          }
      
    }
    return arr2

  }
}
}
