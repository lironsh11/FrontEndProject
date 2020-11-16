import { HttpClient,HttpHeaders, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit {
  role = localStorage.role
  arrRentInfo:any =[];
  arrCarInfo:any =[]
  currectRent;
  currectCarDayValue;
  currectCarLateValue;
  confirmCarMsg;
  finalPrice;
  lateFine =0;
  lateDays=0;
  isCarReturned = true;
  isAfterReturn:boolean = false;
  todayDate =  new Date().toISOString().slice(0, 10); 

//geting date from server to the 2 diffrent arrays
  constructor(private Connection:HttpClient, private ConnectionPut:HttpClient , private Connection2:HttpClient, private router: Router) {
    this.Connection.get("http://localhost:64130/rentinfo").subscribe(t=>this.arrRentInfo=t);
    this.Connection2.get("http://localhost:64130/carsinfo").subscribe(t=>this.arrCarInfo=t);
 
  }
//function to calculate final price options
  calcRentPrice()
  {
    for (let i = 0; i < this.arrCarInfo.length; i++) {
      if (this.arrCarInfo[i].carId == this.currectRent.carId) {
         
        this.currectCarDayValue = this.arrCarInfo[i].dayValue
        this.currectCarLateValue = this.arrCarInfo[i].lateDayValue
      }
    }

   
    let currentDate =new Date(this.currectRent.rentDate);
    let returnDate = new Date(this.currectRent.returnDate);
    let realReturnDate =   new Date(this.currectRent.realReturnDate);

    if (this.isAfterReturn) {
      this.currectRent.realReturnDate = this.todayDate;
      realReturnDate =   new Date(this.todayDate);
    }
    //calculate the fine if the user return the car late
    if (this.currectRent.returnDate != this.currectRent.realReturnDate && this.currectRent.realReturnDate != null && this.currectRent.returnDate < this.currectRent.realReturnDate ) {
      let daysFine= Math.floor((Date.UTC(realReturnDate.getFullYear(), realReturnDate.getMonth(), realReturnDate.getDate()) - Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) ) /(1000 * 60 * 60 * 24));
      let fine = daysFine*parseInt(this.currectCarLateValue);
      alert("the user have a fine for " + daysFine + " days \n Fine is:" + fine + "₪" )
      this.finalPrice= Math.floor((Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
      this.finalPrice *=  parseInt(this.currectCarDayValue) + fine;
    }
  
else{


    this.finalPrice= Math.floor((Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
    this.finalPrice *=  parseInt(this.currectCarDayValue);
  }
  }

  //function that get car id and call to return the car and if the car all ready returned then sending alert
  GetRentInfo( carid:number ) : void{
    
    for (let i = 0; i < this.arrRentInfo.length; i++) {
      if (this.arrRentInfo[i].carId == carid) {
    
        //check if the user return the car after time
        
        if (this.arrRentInfo[i].returnDate < this.todayDate) {
          
          this.isAfterReturn = true
        }
        //check if the car is allready returned, and if not - calling to the function the return the car and price
        if (this.arrRentInfo[i].realReturnDate == null || this.arrRentInfo[i].realReturnDate == "") {
        this.isCarReturned = false
       
        this.currectRent =this.arrRentInfo[i] ;
        this.returnCar(carid,this.arrRentInfo[i].rentId );
        this.calcRentPrice();
        this.confirmCarMsg = "Car returned to stock";
        
      }
      }
     
    }

    if (this.isCarReturned) {
      alert("Car is allready returned or not in database")
    }
  }

    //function that actualy return the car to stock and updating the rent real return date
  returnCar( carid:any, rentid:any ) : void{



    this.ConnectionPut.put("http://localhost:64130/Carsinfo/"+carid+"/yes"
    ,{"observe":"response" }).subscribe();
    this.ConnectionPut.put("http://localhost:64130/rentinfo/"+rentid+"/"+
     this.todayDate.toString(),{"observe":"response" }).subscribe();
  
  
  

  }
  //function that help reading local storang value
  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
}

  //read the currect value of localstorage key
  ngOnInit(): void {
    
    this.role =this.readLocalStorageValue('role');
  }

}
