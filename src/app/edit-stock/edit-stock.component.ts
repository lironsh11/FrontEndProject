import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {
  errormsg="";
  arrInfoCars;
  isEdit;
  isAdd;
  onlyNumberErrorMsg= ""
  isDelete;
  currectCar;
  doneEdit= "";
  role:any = localStorage.role
  constructor(private Connection:HttpClient , private Connection2:HttpClient, private ConnectionPut:HttpClient, private ConnectionPut2:HttpClient,private postConnection:HttpClient, private postConnection2:HttpClient,private deleteConnection:HttpClient,private deleteConnection2:HttpClient) {
    this.Connection.get("http://localhost:64130/carsinfoadmin").subscribe(t=>this.arrInfoCars=t);
    
   
    
  }

    //get the currect car to delete and ask if to delete
  getDeleteCar(carid:any) {

    this.currectCar= carid
    this.isEdit= false
    
   var choice = confirm("Are you sure you want to delete Car - "+ this.currectCar.carType+ "?");
   if (choice == true) {
 

 this.deleteConnection.delete("http://localhost:64130/carsinfoadmin/"+this.currectCar.carId,{"observe":"response" }).subscribe();
 this.deleteConnection2.delete("http://localhost:64130/carstype/"+this.currectCar.carId,{"observe":"response" }).subscribe();
 alert("Car deleted!")
} else {
  alert("You pressed Cancel! Nothing changed!")
}

  }
    //function that get all parameters and edit the currect car
  editRent(carid:string,model:string, Manufacturer:string,ManufacturerYear:string ,GearType:string,DayValue:string,LateDayValue:string, carType:string, AvailableForRent:string, ProperForRent:string, CurrectMileage:string, pic:string) : void{
    if (pic=="") {
      pic = null
    }
    
    if ( this.errorMsg(carid) || this.errorMsg(model) ||  this.errorMsg(Manufacturer)||  this.errorMsg(ManufacturerYear) ||  this.errorMsg(DayValue)||  this.errorMsg(LateDayValue)||  this.errorMsg(CurrectMileage) ) {
    
      return;
    }

    if (isNaN(parseInt(carid))||isNaN(parseInt(ManufacturerYear)) || isNaN(parseInt(DayValue)) || isNaN(parseInt(LateDayValue)) || isNaN(parseInt(CurrectMileage))) {
      
      this.errormsg = ""
      this.onlyNumberErrorMsg = "Only Numbers!";
      return;
    }
    
    this.ConnectionPut.put("http://localhost:64130/carsinfoadmin/"+this.currectCar.carId+"/"+ carid+"/"+ carType+"/"+ AvailableForRent+"/"+ ProperForRent+"/"+ CurrectMileage+"/"+ pic,{"observe":"response" }).subscribe();
  
    this.ConnectionPut2.put("http://localhost:64130/carstype/"+this.currectCar.carId+"/"+ carid+"/"+ model+"/"+ Manufacturer+"/"+ ManufacturerYear+"/"+ GearType+"/"+ DayValue+"/"+ LateDayValue,{"observe":"response" }).subscribe();
    this.errormsg = ""
    this.onlyNumberErrorMsg = "";
    this.doneEdit= "Changes has done, Please refresh to see the changes"
    }

        //function that get all parameters and add a new car
  AddCar(carid:string,model:string, Manufacturer:string,ManufacturerYear:string ,GearType:string,DayValue:string,LateDayValue:string, carType:string, AvailableForRent:string, ProperForRent:string, CurrectMileage:string, pic:string) : void{
    if ( this.errorMsg(carid) || this.errorMsg(model) ||  this.errorMsg(Manufacturer)||  this.errorMsg(ManufacturerYear) ||  this.errorMsg(DayValue)||  this.errorMsg(LateDayValue)||  this.errorMsg(CurrectMileage) ) {
    
      return;
    }

    if (isNaN(parseInt(carid))||isNaN(parseInt(ManufacturerYear)) || isNaN(parseInt(DayValue)) || isNaN(parseInt(LateDayValue)) || isNaN(parseInt(CurrectMileage))) {
      
      this.errormsg = ""
      this.onlyNumberErrorMsg = "Only Numbers!";
      return;
    }
    this.postConnection2.post("http://localhost:64130/carsinfoadmin/",{"carId":parseInt(carid),"carType":carType,"currectMileage":parseInt(CurrectMileage),"picture": pic,"properForRent": ProperForRent,"availableForRent": AvailableForRent})
    .subscribe();
    this.postConnection2.post("http://localhost:64130/carstype/",{"model":model,"manufacturer":Manufacturer,"dayValue": DayValue,"lateDayValue": LateDayValue,"manufacturerYear": ManufacturerYear,"gearType": GearType, "carId":parseInt(carid)})
    .subscribe();
    this.errormsg = ""
    this.onlyNumberErrorMsg = "";
    this.doneEdit= "Changes has done, Please refresh to see the changes"
    }
  //function that check if the string is blank
    errorMsg(value:string):boolean{
      if (value == "") {
        this.errormsg = "required field"
        return true;
      }
      return false;
    }

    //function that get the currect car
  getCar(carid:any) {
    this.isAdd = false;
    this.isDelete = false;
    this.currectCar= carid
    this.isEdit= true
  }
 //function that work if the add button got click and isAdd go true
  getAdd(){
    this.isEdit= false;
    this.isAdd = true;
   
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
