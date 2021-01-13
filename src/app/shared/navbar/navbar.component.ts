import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent implements OnInit {
  error
  errors = []
  noItems
  totalPrice = 0

  searchFor
  cartnum = 0
  wishnum = 0
  empty = true
  cart = JSON.parse(localStorage.getItem("myCart"))
  wish = JSON.parse(localStorage.getItem("wishs"))
  cartModal = false

  constructor(config: NgbDropdownConfig, public modalService: NgbModal, public router: Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.numbering()
  }

  numbering() {
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    this.wish = JSON.parse(localStorage.getItem("wishs"))
    this.cartnum = this.cart.length
    this.wishnum = this.wish.length
    if (!this.cartModal) {
      this.delay().then(() => this.numbering())
    }
  }

  search(): void {
    this.redirectTo('/deps/search')
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/deps/search'], { state: { data: this.searchFor } }))
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, .1));
  }




  //Shopping cart *************************************************************************
  sized(item) {
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    let newCart = this.cart.map(x => {
      if (x.itemId == item.itemId) {
        x.selectedSize = item.selectedSize
      }
      return x
    })
    localStorage.setItem('myCart', JSON.stringify(newCart))
  }

  quantized(item) {
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    let newCart = this.cart.map(x => {
      if (x.itemId == item.itemId) {
        x.itemQua = item.itemQua
      }
      return x
    })
    localStorage.setItem('myCart', JSON.stringify(newCart))
    this.totalPrice = 0
    for (var x = 0; x < newCart.length; x++) {
      this.totalPrice = this.totalPrice + this.cart[x].itemPrice * this.cart[x].itemQua
    }
  }

  openCartModal() {
    this.cartModal = !this.cartModal
    this.prepairCartData()
  }



  prepairCartData() {
    this.cartModal = true
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    this.totalPrice = 0
    if (this.cart.length != 0) {
      this.noItems = false
      for (var x = 0; x < this.cart.length; x++) {
        this.totalPrice = this.totalPrice + this.cart[x].itemPrice * this.cart[x].itemQua
      }

    } else {
      this.noItems = true
    }
  }

  deletItem(item) {
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    this.cart = this.cart.filter(x => x.itemId !== item.itemId)
    localStorage.setItem('myCart', JSON.stringify(this.cart))
    this.prepairCartData()
  }

  navCheckout() {
    this.errors = []
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    this.cart.map(x => {
      if ((x.itemSizes != 0) && ((!x.selectedSize) || (x.selectedSize == 0))) {
        this.errors.push(x)
      }
    })
    if (this.errors.length == 0) {
      this.router.navigateByUrl('/check/out')
      this.error = null
      this.cartModal = false
    } else {
      document.querySelector('.size').classList.toggle('active')
      this.error = "!يرجى اختيار المقاس"
    }

  }


}
