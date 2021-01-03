import { Component, OnInit  } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { UserDetails } from '../../interfaces/authconfig';
import { LstorageService } from '../../lstorage.service';

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
  details: UserDetails = {
    _id: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    gender: "",
    verified: false,
    exp: 0,
    iat: 0
  }
  searchFor
  cartnum = 0
  wishnum = 0
  empty = true
  cart = JSON.parse(localStorage.getItem("myCart"))
  wish = JSON.parse(localStorage.getItem("wishs"))
  cartModal = false

  constructor(private storageService: LstorageService , config: NgbDropdownConfig, public auth: AuthService, public modalService: NgbModal, public router: Router) {
    config.placement = 'bottom-right';
    this.storageService.watchStorage().subscribe((data:string) => {
      this.cart = JSON.parse(localStorage.getItem("myCart"))
      this.cartnum = this.cart.length
      console.log('changed')
      })
  }

  ngOnInit() {
    this.storageService.watchStorage().subscribe((data:string) => {
      this.cart = JSON.parse(localStorage.getItem("myCart"))
      this.cartnum = this.cart.length
      console.log('changed')
      })
    this.fetchData()
  }



  search(): void {
    this.redirectTo('/deps/search')
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/deps/search'], { state: { data: this.searchFor }} ))
  }
  onStorageChange(ev:KeyboardEvent) {
    this.cart = JSON.parse(localStorage.getItem("myCart"))
    this.cartnum = this.cart.length
  }

  fetchData() {
    if (this.auth.isLoggedIn()) {
      this.auth.profile().subscribe(user => {
        this.details = user;
      }, (err) => {
        //  this.delay().then(() => this.fetchData())
      });
    }
  }
  delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
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
        this.totalPrice = this.totalPrice + this.cart[x].itemPrice
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
      if ((x.itemSizes != 0) && ((!x.selectedSize)||(x.selectedSize == 0))) {
        this.errors.push(x)
      }
    })
    if (this.errors.length == 0) {
      this.router.navigateByUrl('/check/out')
      this.error = null
    } else {
      document.querySelector('.size').classList.toggle('active')
      this.error = "!يرجى اختيار المقاس"
    }

  }


}
