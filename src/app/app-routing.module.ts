//*** step 1 create components  ng g c  first, second, third */

import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnCarComponent } from './return-car/return-car.component';
import { UsersComponent } from './users/users.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

//** step 2 create routing table mapping file   app.routes.ts */

export const routes: Routes=[
    {path:"",redirectTo:"/home",pathMatch:'full'},
    {path:"home",component:HomeComponent},
    {path:"signup",component:SignupComponent},
    {path:"login",component:LoginComponent},
    {path:"nav-bar",component:NavBarComponent},
    {path:"cars-list",component:CarsListComponent}, 
    {path:"orders",component:OrdersComponent},
    {path:"return-car",component:ReturnCarComponent}, 
    {path:"users",component:UsersComponent},
    {path:"edit-stock",component:EditStockComponent},
    {path:"user-orders",component:UserOrdersComponent},
];

export const routing:ModuleWithProviders=RouterModule.forRoot(routes);