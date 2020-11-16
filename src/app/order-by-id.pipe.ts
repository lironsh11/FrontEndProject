import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderById'
})
export class OrderByIdPipe implements PipeTransform {

  transform(arr: any[], val: string): unknown {
    let arr2=[]

    if (arr != undefined) {
      
   
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].userId.includes(val)) {
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
