import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistProductsComponent } from './wishlist-products/wishlist-products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    ViewProductsComponent,
    WishlistProductsComponent,
    CartProductsComponent,
    FilterPipe
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
