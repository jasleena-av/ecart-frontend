import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistProductsComponent } from './wishlist-products/wishlist-products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';

const routes: Routes = [
  // allproductscomponent
  { path: '', component: AllProductsComponent },
{
  path:'view-products/:id',component:ViewProductsComponent
},
{
  path:'wishlist-products',component:WishlistProductsComponent
},
{
  path:'cart-products',component:CartProductsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
