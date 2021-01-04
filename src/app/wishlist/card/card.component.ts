import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item;
  subscription: Subscription;
  carted = false
  liked = true
  constructor(public router: Router, public config: ConfigService) { }

  ngOnInit() {
    this.subscription = interval(10).subscribe(val => this.carter());
  }



  carter() {
    let cart = JSON.parse(localStorage.getItem("myCart"))
    this.carted = cart.some(x => x.itemId === this.item.itemId)
  }

  removeWish(item) {
    this.liked = !this.liked
    let wishs = JSON.parse(localStorage.getItem("wishs"))
    wishs = wishs.filter(x => x.itemId !== item.itemId)
    localStorage.setItem('wishs', JSON.stringify(wishs))
  }


  openMediumModal(item) {
    this.carted = !this.carted
    let cart = JSON.parse(localStorage.getItem("myCart"))
    let newCart = []
    if (cart) {
      newCart = cart.map(x => {
        return x
      })
    }
    let data = {
      itemId: item.itemId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemGender: item.itemGender,
      itemClassefication: item.itemClassification,
      itemSizes: item.itemSizes.split(' '),
      itemImgUrl: item.itemImgUrl,
      itemPurchases: item.itemPurchases,
      userName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
      userId: "",
      selectedSize: 0,
      itemQua: 1
    }
    var re = newCart.some(x => x.itemId === data.itemId)
    if (!re) {
      newCart.push(data)
      localStorage.setItem('myCart', JSON.stringify(newCart))
    } else {
      newCart = newCart.filter(x => x.itemId !== data.itemId)
      localStorage.setItem('myCart', JSON.stringify(newCart))
    }

  }
  navItem(item) {
    this.router.navigate(['deps/item', item.itemId]);

  }

}
