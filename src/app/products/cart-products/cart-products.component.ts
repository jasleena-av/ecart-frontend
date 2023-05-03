import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;


  allproducts:any=[]
  cartTotalprice:number =0
  proceedtopaymentbtnclickedatatus:boolean=false
  username:string=""
  flat:string=""
  street:string=""
  state:string=""
  offerClickstatus:boolean=false
  discountClickedstatus:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean =false
  showPaypal:boolean=false

  // address
   addressForm=this.fb.group({
    username:[''],
    flat:[''],
    street:[''],
    state:['']
   })

  constructor(private api:ApiService,private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.api.getcart()
    .subscribe(
      // 200
      (result:any)=>{
      console.log(result);
      this.allproducts=result
      // call getcart
      this.getCartTotal()
      // paypal
      this.initConfig()
      
    },
    // 400
    (result:any)=>{
    console.log(result.error);
    }

    )
    
  }

  getCartTotal(){
    let total =0
    this.allproducts.forEach((item:any)=>{
      total += item.grandTotal
      this.cartTotalprice = Math.ceil(total)
    })
    
  }

  removeItem(product:any){
    this.api.removecartitem(product).subscribe((result:any)=>{
      this.allproducts =result

      // update cart total price
      this.getCartTotal()
      // update cart total count
      this.api.cartcount()

    },
    (result:any)=>{
      alert(result.error)
    }
    
    )
  }

  // emptycart
  emptyCart(){
    this.api.emptycart().subscribe((result:any)=>{
      this.allproducts =[]

          // update cart total price
          this.getCartTotal()
          // update cart total count
          this.api.cartcount()
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  increment(product:any){
    this.api.incCartItem(product).subscribe(
      (result:any)=>{
      this.allproducts=result
      // update cart total price
      this.getCartTotal()

    },
    (result:any)=>{
      alert(result.error)
    })
  }

  decrement(product:any){
    this.api.decCartItem(product).subscribe((result:any)=>{
      this.allproducts =result
      // update cart total price
      this.getCartTotal()

    },
    (result:any)=>{
      alert(result.error)
    })
  }

  submitBtnClicked(){
    if(this.addressForm.valid){
      this.proceedtopaymentbtnclickedatatus=true
      this.username=this.addressForm.value.username||""
      this.flat=this.addressForm.value.flat||""
      this.street=this.addressForm.value.street||""
      this.state=this.addressForm.value.state||""

    }
    else{
      alert("invalid form")
    }
  }

  offerClicked(){
    this.offerClickstatus=true

  }

  discount10(){
   let discount= Math.ceil(this.cartTotalprice*10/100)
   this.cartTotalprice-=discount
   this.discountClickedstatus=true

  }

  makepayment(){
    this.showPaypal=true

  }

  discount50(){
    let discount= Math.ceil(this.cartTotalprice*50/100)
    this.cartTotalprice-=discount
    this.discountClickedstatus=true
 
  }


  // pay pal method
   private initConfig(): void {
    let amount=this.cartTotalprice.toString()
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data:any) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: amount
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    
      this.showSuccess = true;
      this.emptyCart()
      // hide showpaypal
      this.showPaypal=false
      // hide proceedtopaymnt
      this.proceedtopaymentbtnclickedatatus=false
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel=true
      // hide paypal div
      this.showPaypal=false
    },
    onError: err => {
      console.log('OnError', err);
      this.showError=true
      this.showPaypal=false
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };


  }

  modalClose(){
    this.addressForm.reset()
    this.showCancel=false
    this.showError=false
    this.showSuccess=false
    this.showPaypal=false
    this.proceedtopaymentbtnclickedatatus=false
  }
 



}
