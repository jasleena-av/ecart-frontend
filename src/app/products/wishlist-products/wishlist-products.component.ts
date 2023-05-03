import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist-products',
  templateUrl: './wishlist-products.component.html',
  styleUrls: ['./wishlist-products.component.css']
})
export class WishlistProductsComponent implements OnInit {

  allProducts:any=[]

  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.api.getwishlist().subscribe((result:any)=>{
      console.log(result);
      this.allProducts=result
      
    },
    (result:any)=>{
      console.log(result.error);
      
    })
  }

  removeItem(id:any){
    this.api.removewishlistitem(id).subscribe((result:any)=>{
      this.allProducts =result
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  // addtocart(product)
  addtocart(product:any){

    // add {quantity:1} to product object
    Object.assign(product,{quantity:1})
    // api call 
    this.api.addtocart(product)
    .subscribe(
      // 200
      (result:any)=>{
        // call cartcount increment
        this.api.cartcount()
        // it helps to remove item from wishlist
        this.removeItem(product.id)
        alert(result)

    },
    // 400
    (result:any)=>{
      alert(result.error)
    }
    )
  }



}
