import { Component, OnInit } from '@angular/core';
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
    name: null,
    address: null,
    email: null,
    phone: null
  }
  oldUser = JSON.parse(localStorage.getItem('user'))
  error
  total
  loading = false
  done = false
  payment = true
  constructor(public configService: ConfigService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.total = 0
    this.cart = JSON.parse(localStorage.getItem('myCart'))
    for (var x = 0; x < this.cart.length; x++) {
      this.total = this.total + this.cart[x].itemPrice * this.cart[x].itemQua
    }
    this.oldUser = JSON.parse(localStorage.getItem('user'))
    if(this.oldUser){
      this.noUser._id = this.oldUser[0].id
      this.noUser.name = this.oldUser[0].name
      this.noUser.address = this.oldUser[0].address
      this.noUser.email = this.oldUser[0].email
      this.noUser.phone = this.oldUser[0].phone
    }
  }

  getUserInfo() {
    this.loading = true
    this.error = null
    if (!this.noUser.name || !this.noUser.address || !this.noUser.phone) {
      this.error = "!يرجى ملأ جميع الحقول المطلوبة"
      this.loading = false
    } else {
      var newOldUser = [{
        id : '00000',
        name : this.noUser.name,
        email : this.noUser.email,
        address : this.noUser.address,
        phone: this.noUser.phone
      }]
      localStorage.setItem('user', JSON.stringify(newOldUser))
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

  sendData() {
    for (var x = 0; x < this.cart.length; x++) {
      let itemId = this.cart[x].itemId
      this.configService.addOrder(this.cart[x]).subscribe(() => {
        this.cart = []
        localStorage.setItem('myCart', JSON.stringify(this.cart))
        this.done = true
        this.loading = false
      }, (err) => {
        this.error = "!خطأ في الاتصال بالخادم"
        this.loading = false
      })
    }

  }
}
