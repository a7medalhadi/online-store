import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart
  noUser = {
    _id: '00000',
    name : null,
    address: null,
    email:null,
    phone:null
  }
  user
  error
  total
  loading = false
  done = false
  payment = true
  constructor(private auth: AuthService,public configService : ConfigService ) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
    this.total = 0
    this.cart = JSON.parse(localStorage.getItem('myCart'))
    for (var x = 0; x < this.cart.length; x++) {
      this.total= this.total + this.cart[x].itemPrice
    }
    console.log(this.cart)
  }

  getUserInfo() {
    this.loading = true
    this.error = null
    if (this.auth.isLoggedIn()) {
      this.auth.profile().subscribe(user => {
        this.user = user;
        console.log(this.user)
        this.cart.map(x => {
          x.userName = this.user.name
          x.userEmail = this.user.email
          x.userPhone = this.user.phone
          x.userAddress = this.user.address
          x.userId = this.user._id
        })
        this.sendData()
      }, (err) => {
        console.error(err);
        this.error = "!خطأ في الاتصال بالخادم"
        this.loading = false
      });
    } else { 
      if(!this.noUser.name || !this.noUser.address || !this.noUser.email || !this.noUser.phone ){
        this.error = "!يرجى ملأ جميع الحقول المطلوبة"
        this.loading = false

      }else{
        this.cart.map(x => {
          x.userName = this.noUser.name
          x.userEmail = this.noUser.email
          x.userPhone = this.noUser.phone
          x.userAddress = this.noUser.address
          x.userId = this.noUser._id
        })
        this.sendData()
      }
     }
  }

  sendData() {
    for (var x = 0; x < this.cart.length; x++) {
      let purchases = [{
        propName : "purchases",
        value: this.cart[x].itemPurchases + 1 
      }]
      let itemId = this.cart[x].itemId
      console.log(purchases)
      this.configService.addOrder(this.cart[x]).subscribe(() => {
        this.configService.updateItem(purchases,itemId).subscribe(() => {
          this.cart = []
          localStorage.setItem('myCart', JSON.stringify(this.cart))
          this.done = true
          this.loading = false
        }, (err) => {
          console.log(err)
          this.error = "!خطأ في الاتصال بالخادم"
          this.loading = false
        })
      }, (err) => {
        console.log(err)
        this.error = "!خطأ في الاتصال بالخادم"
        this.loading = false
      })
    }

  }
}
