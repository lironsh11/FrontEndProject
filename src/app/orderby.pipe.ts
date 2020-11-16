import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(arr: any[]): unknown {

    if (arr != undefined) {
    for (let i = 0; i < arr.length; i++) {
      parseInt(arr[i].manufacturerYear);
      
    }
  
    
    var swapp;
    var n = arr.length-1;
    
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (arr[i].manufacturerYear > arr[i+1].manufacturerYear)
            {
               var temp = arr[i].manufacturerYear;
               arr[i].manufacturerYear = arr[i+1].manufacturerYear;
               arr[i+1].manufacturerYear = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
  }
 return arr; 
}
        
    
  
  
  }


