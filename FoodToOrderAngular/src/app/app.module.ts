import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AbooutUsComponent } from './aboout-us/aboout-us.component';
import { AdminComponent } from './admin/admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantOwnerComponent } from './restaurant-owner/restaurant-owner.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DeleteUserDirective } from './delete-user.directive';
import { FliterOrderComponent } from './fliter-order/fliter-order.component';
import { FilterUserComponent } from './filter-user/filter-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    UserComponent,
    RestaurantsComponent,
    CartComponent,
    OrderComponent,
    AbooutUsComponent,
    AdminComponent,
    ContactUsComponent,
    HomeComponent,
    PageNotFoundComponent,
    RestaurantOwnerComponent,
    RestaurantDetailsComponent,
    UserDetailsComponent,
    CartDetailsComponent,
    OrderDetailsComponent,
    SignUpComponent,
    UpdateUserComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    UpdateOrderComponent,
    RestaurantCardComponent,
    DialogComponentComponent,
    DeleteUserDirective,
    FliterOrderComponent,
    FilterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
