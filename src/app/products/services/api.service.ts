import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // to hold searchterm-behavior subject
  searchTerm =new BehaviorSubject('')
  // to hold cartcount
  cartItemsCount=new BehaviorSubject(0)

   BASE_URL ='https://ecart-57y2.onrender.com'
   
  constructor(private http:HttpClient) {
    this.cartcount()
   }

  // getallproducts
  getallproducts(){
    // api
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  // view-products
  viewproduct(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/products/view-products/${id}`)
  }

  // wishlist/add-product
  addtowishlist(id:any,title:any,price:any,image:any){
    const body ={
      id,title,price,image
    }
    // api
    return this.http.post(`${this.BASE_URL}/wishlist-products/add-product`,body)

  }

  // wishlist/get-items
  getwishlist(){
    // api
    return this.http.get(`${this.BASE_URL}/wishlist-products/get-items`)
  }

  // wishlist/remove item/20
  removewishlistitem(id:any){
    // api
    return this.http.delete(`${this.BASE_URL}/wishlist-products/remove-item/${id}`)
  }
  // add to cart api/add-product
  addtocart(product:any){
    // get id,title,image,price,quantity
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity

    }
    // api
    return this.http.post(`${this.BASE_URL}/cart-products/add-item`,body)
  }
  
  // getcart
  getcart(){
    return this.http.get(`${this.BASE_URL}/cart-products/all-products`)

  }

  // cartCount
  cartcount(){
    this.getcart().subscribe((result:any)=>{
      this.cartItemsCount.next(result.length)
    })
  }

  // cart/remove-item/1
  removecartitem(id:any){
    return this.http.delete(`${this.BASE_URL}/cart-products/remove-item/${id}`)

  }

  // cart/remove all items
  emptycart(){
    return this.http.delete(`${this.BASE_URL}/cart-products/remove-all-item`)
  }

  // increment item
  incCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/cart-products/increment-item/${id}`)
  }

  // decrement item
  decCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/cart-products/decrement-item/${id}`)

  }


}
