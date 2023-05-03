import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  productId:string=""
  product:any={}

  constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){


  }
  ngOnInit(): void {
    // to get path parameter from route
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      this.productId=data.id

      
    })

    // call view product api
    this.api.viewproduct(this.productId).subscribe(
      (result:any)=>{
      console.log(result);
      this.product=result
      
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  // api add to wishlist
  addtowishlist(){
    const{id,title,price,image} =this.product
    // api
    this.api.addtowishlist(id,title,price,image).subscribe(
      // 200
      (result:any)=>{
      alert(result)
    },
    // 400
    (result:any)=>{
      alert(result.error)
    
    }
    )
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
        // call cartcount
        this.api.cartcount()
        alert(result)

    },
    // 400
    (result:any)=>{
      alert(result.error)
    }
    )
  }

}
