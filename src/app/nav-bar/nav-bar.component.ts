import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogin:boolean = localStorage.isLogin
  role:any = localStorage.role
  currectUser =localStorage.uName ;
  constructor(private router:Router) {
    this.isLogin = localStorage.isLogin
   
   }
//function that help reading localstorage value
   readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
}
//function that logout the user and clear the localstorage
  logout(){
    localStorage.isLogin=false;
    localStorage.Login = true;
    localStorage.uName= "";
    localStorage.role = ""
    this.router.navigateByUrl('/home');

  }
  ngOnInit(): void {
    this.isLogin =JSON.parse(this.readLocalStorageValue('isLogin'));
    this.role =this.readLocalStorageValue('role');
  }

}
