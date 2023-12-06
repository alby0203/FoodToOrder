import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbooutUsComponent } from './aboout-us/aboout-us.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AdminComponent } from './admin/admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { adminGuard } from './guards/adminguard';
import { RestaurantOwnerComponent } from './restaurant-owner/restaurant-owner.component';
import { restowner } from './guards/restownerguard';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'aboutus',component:AbooutUsComponent},
  {path:'restaurants',component:RestaurantsComponent},
  {path:'restaurantowner',component:RestaurantOwnerComponent,canActivate:[restowner()]},
  {path:'admin',component:AdminComponent,canActivate:[adminGuard()]},
  {path:'contactus',component:ContactUsComponent},
  {path:'restaurantdetails/:rid',component:RestaurantDetailsComponent},
  {path:'userdetails/:uid',component:UserDetailsComponent,canActivate:[adminGuard()]},
  {path:'cartdetails/:cid',component:CartDetailsComponent,canActivate:[adminGuard()]},
  {path:'orderdetails/:oid',component:OrderDetailsComponent,canActivate:[adminGuard()]},
  {path:'updaterestaurant',component:UpdateRestaurantComponent},
  {path:'**',component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,/*{enableTracing:true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
