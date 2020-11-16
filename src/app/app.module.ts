import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import { OrderbyPipe } from './orderby.pipe';
import { OrdersComponent } from './orders/orders.component';
import { ReturnCarComponent } from './return-car/return-car.component';
import { UsersComponent } from './users/users.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { OrderByIdPipe } from './order-by-id.pipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NavBarComponent,
    CarsListComponent,
    SearchPipe,
    OrderbyPipe,
    OrdersComponent,
    ReturnCarComponent,
    UsersComponent,
    EditStockComponent,
    UserOrdersComponent,
    OrderByIdPipe, 
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, routing , CarouselModule.forRoot(),
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
