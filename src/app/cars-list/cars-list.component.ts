import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
  providers: [DatePipe]
})

export class CarsListComponent implements OnInit {
  serverDown;
  isServerDown= false;
  usersList:any
  searchText:string = "";
  searchGear:string = "";
  searchYear:string = "";
  searchManufacturer:string = "";
  searchModel:string = "";
  localCar=JSON.parse(localStorage.getItem('cars'));
  rentDays:number= 0;
  errormsg;
  arrAllInfo = [];
  localStorage;
currectCar:any;
isOrder:boolean = false
isLogin:boolean 
arrInfoCars;
arrRentInfo
todayDate =  new Date().toISOString().slice(0, 10); 
currectUser =localStorage.uName ;
currectUserId =localStorage.userId ;
//get carsinfo data to arrinfocars array
  constructor(private Connection:HttpClient , private Connection2:HttpClient, private ConnectionPut:HttpClient,private postConnection:HttpClient,  private router: Router , public datepipe: DatePipe) {

    
  
    this.Connection.get("http://localhost:64130/carsinfo").subscribe(t=>this.arrInfoCars=t);
    
    this.Connection2.get("http://localhost:64130/rentinfo").subscribe(t=>this.arrRentInfo=t);

  
  }



  //function to check if user not enter valid field
errorMsg(value:any):boolean{
  if (value == "" || value == 0) {
    alert("You must enter days!")
    return true;
  }
 if (value % 1 != 0 || value < 0 ) {
    alert("You must enter a full/positive number (days)!")
    return true;
  }
  return false;
}
  //function to create new rent order
  PostNewRent( rentDate:Date, returnDate:string ){
    if (  this.errorMsg(returnDate) ) {
      
      return;
    }

    else  {
  
      let currentDate =new Date(rentDate);
      currentDate.setDate( currentDate.getDate() + parseInt( returnDate) );
      
      this.postConnection.post("http://localhost:64130/rentinfo",{"carId":this.currectCar.carId,
                                                                  "rentDate":rentDate,
                                                                  "returnDate": this.datepipe.transform(currentDate, 'yyyy-MM-dd'),
                                                                  "userId": this.currectUserId})
      .subscribe(t=>console.log(t));
      this.ConnectionPut.put("http://localhost:64130/Carsinfo/"+this.currectCar.carId+"/no",{"observe":"response" }).subscribe();
   
       alert("Order Confirmed! ")
      this.router.navigateByUrl('/home');
    }
    }
  
 //function to redirect the user to login before he can order
  redirectLogin(){
    this.router.navigateByUrl('/login');
  }

   //function that calculate the final price for rent
  getPrice(val:number, price:number){
  if (val<0) {
    return 0;
  }
    return val*price;
  }

  

   //function that select the currect car to order
  getOrder(carid:any) {
 
 
      localStorage.setItem('cars', JSON.stringify(carid));
     
      this.currectCar= carid
      this.isOrder= true
    
     
    
   

  }
//function that helping to read the localstorage value
  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
}





  //read the currect value of localstorage key
  ngOnInit(): void {
    this.isLogin =JSON.parse(this.readLocalStorageValue('isLogin'));

  }


}
