import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersArr: any = [];
  isLogin: boolean
  currectUser: any
  isErrorLogin = true;
  errorMsg =""

  //geting date from server to the array
  constructor(private Connection: HttpClient, private router: Router) {
    this.Connection.get("http://localhost:64130/Users").subscribe(t => this.usersArr = t);
  }

//function that help reading localstorage value
  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  //check if user is in data and confirm/denied
  GetLoginUser(username: string, password: string): void {

    for (let i = 0; i < this.usersArr.length; i++) {
      if (this.usersArr[i].userName == username && this.usersArr[i].password == password) {
        this.currectUser = this.usersArr[i].fullName;
        localStorage.role = this.usersArr[i].role;
        localStorage.isLogin = true;
        localStorage.Login = false;
        localStorage.userId = this.usersArr[i].id
        localStorage.uName = this.currectUser;
        this.isErrorLogin = false
        this.router.navigateByUrl('/cars-list');

      }

    }
    if (this.isErrorLogin) {
      this.errorMsg = "Oops! Wrong username or password (case senetive)"
    }


  }
  //read the currect value of localstorage key
  ngOnInit(): void {
    this.isLogin = JSON.parse(this.readLocalStorageValue('Login'));
  }

}
