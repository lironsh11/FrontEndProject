import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  arrRentInfo;
  role = localStorage.role
  currectRent;
  isEdit = false;
  doneEdit= "";
  isAdd;
  errormsg="";
  todayDate =  new Date().toISOString().slice(0, 10); 
  constructor(private Connection:HttpClient, private ConnectionPut:HttpClient, private deleteConnection:HttpClient, private postConnection:HttpClient) {

        
    this.Connection.get("http://localhost:64130/rentinfoadmin").subscribe(t=>this.arrRentInfo=t);
    
   }

   //function that check if the string is blank
   errorMsg(value:string):boolean{
    if (value == "") {
      this.errormsg = "required field"
      return true;
    }
    return false;
  }

     //function that get the currect rentid
   getRent(rentid:any) {
    this.isAdd = false;
    this.currectRent= rentid;
    this.isEdit= true;
  }
   //function that get all parameters and edit the currect rent 
  editRent(carid:string, userid:string, rentDate:string, returnDate:string, RealReturnDate:string) : void{

    if ( this.errorMsg(carid) || this.errorMsg(userid) ||  this.errorMsg(rentDate)||  this.errorMsg(returnDate) ) {
    
      return;
    }
    if (RealReturnDate == "") {
      RealReturnDate = null
    }
    this.ConnectionPut.put("http://localhost:64130/rentinfoadmin/"+this.currectRent.rentId+"/"+ carid+"/"+ userid+"/"+ rentDate+"/"+ returnDate+"/"+ RealReturnDate,{"observe":"response" }).subscribe();
  
    this.doneEdit= "Changes has done, Please refresh to see the changes"
    }
 //function  that get all parameters and add a new rent
    addRent(carid:string, userid:string, rentDate:string, returnDate:string, RealReturnDate:string) : void{
      if ( this.errorMsg(carid) || this.errorMsg(userid) ||  this.errorMsg(rentDate)||  this.errorMsg(returnDate) ) {
    
        return;
      }

      this.postConnection.post("http://localhost:64130/rentinfoadmin",{"carId":parseInt(carid),"userId":userid,"rentDate":rentDate,"returnDate": returnDate,"realReturnDate": RealReturnDate})
      .subscribe();
      this.ConnectionPut.put("http://localhost:64130/Carsinfo/"+carid+"/no",{"observe":"response" }).subscribe();
      this.doneEdit= "Changes has done, Please refresh to see the changes"
      }

       //function that work when you want to add a new car and isAdd go true
    getAdd(){
      this.isEdit= false;
      this.isAdd = true;
     
    }
     //function that get the currect rentid and delete if the user confirm
    getDeleteRent(rentid:any) {

      this.currectRent= rentid
      this.isEdit= false
      
     var choice = confirm("Are you sure you want to delete Rent Id - "+ this.currectRent.rentId+ "?");
     if (choice == true) {
   
  
   this.deleteConnection.delete("http://localhost:64130/rentinfoadmin/"+this.currectRent.rentId,{"observe":"response" }).subscribe();
   alert("Rent Id deleted!")
  } else {
    alert("You pressed Cancel! Nothing changed!")
  }
  
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
