import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  arrRentInfo;
  role:any = localStorage.role;
  currectUser =localStorage.userId ;
  constructor(private Connection:HttpClient) { 

    this.Connection.get("http://localhost:64130/rentinfo").subscribe(t=>this.arrRentInfo=t);
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
