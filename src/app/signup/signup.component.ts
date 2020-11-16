import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLogin:boolean;
  errormsg;
  emailErrorMsg;
  fullNameErrorMsg;

  constructor(private postConnection:HttpClient ,  private router: Router) { 

  }


  //function to change error msg if user didnt enter value
errorMsg(value:string):boolean{
  if (value == "") {
    this.errormsg = "required field"
    return true;
  }
  return false;
}

 pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//function to check if the user enter a valid email
 isEmailAddress(str: string):boolean {
if (str.match(this.pattern)) {
  this.emailErrorMsg = ""
  return false;
}
   else{
      this.emailErrorMsg = "please currect email"
    return true;
   }
}
//function the check if full name contain mumbers
 isString(str: any):boolean {
         
  var matches = str.match(/\d+/g);
  if (matches != null) {
    this.fullNameErrorMsg = "Cant contain numbers";
      return true
  }
  else  {
    this.fullNameErrorMsg = "";
    return false;
  }
}

//function that help reading localstorage value
readLocalStorageValue(key: string): string {
  return localStorage.getItem(key);
}

//function that get all user values and post a new user to date
  PostNewUser(id:string  ,Fname:string, username:string, gender:string, email:string , password:string , birthday:string = null,pic:string = null){
  if ( this.errorMsg(id) || this.errorMsg(Fname) || this.errorMsg(email) ||  this.errorMsg(password) ) {
    
    return;
  }
   if (this.isString(Fname)) {
    this.errormsg = ""
    return;
  }
   if (this.isEmailAddress(email)) {
    this.errormsg = ""
    return;
  }
  else  {

  password = password.trim();
    this.postConnection.post("http://localhost:64130/Users",{"id":id  
    ,"fullName":Fname,"userName":username,"dateOfBirth": birthday,"gender": gender,"email":  email,"password":password.trim(),"picture":pic,"role":"Normal User"})
    .subscribe();
    alert("Signup Confirmed! Welcome! \n Now you can login!")
    this.router.navigateByUrl('/home');
  }
  }

    //read the currect value of localstorage key
  ngOnInit(): void {
    this.isLogin =JSON.parse(this.readLocalStorageValue('Login'));
    }

}
