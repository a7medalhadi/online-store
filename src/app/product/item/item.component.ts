import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Wish } from '../../card/card.component';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  crumbLink
  loaded = false
  item
  related
  done = false
  constructor(public router:Router,  public configService: ConfigService, public activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.activatedroute.params.subscribe(data => {
      this.configService.getItemById(data.itemId).subscribe(result => {
        this.item = result
        this.loaded = true
        if(result.gender == "Women"){
          this.crumbLink = "نساء"
        }else{
          this.crumbLink = "رجال"
        }
        this.configService.getRelated(this.item.classification,this.item.gender).subscribe(observer=>{
          this.related = observer
          this.done = true
        })
      })
    })
  }
  navItem(item) {
    this.router.navigate(['deps/item', item._id]);
  }
navi(){
  if(this.crumbLink == "نساء"){
    this.router.navigateByUrl('deps/women')
  }else{
    this.router.navigateByUrl('deps/men')
  }
}
  openMediumModal(item) {
    let cart = JSON.parse(localStorage.getItem("myCart"))
    let newCart = []
    if (cart) {
      newCart = cart.map(x => {
        return x
      })
    }
      let data = {
        itemId: item._id,
        itemName: item.name,
        itemPrice: item.price,
        itemGender: item.gender,
        itemClassefication: item.classification,
        itemSizes: item.sizes.split(' '),
        itemColors: item.colors,
        itemImgUrl: item.imgUrl,
        userName: "",
        userEmail: "",
        userPhone: "",
        userAddress: "",
        userId: "",
        selectedSize:null,
        itemQua:1
      }

      var re = newCart.some(x => x.itemId === data.itemId)
      if (!re) {
        newCart.push(data)
        localStorage.setItem('myCart', JSON.stringify(newCart))
      }
    }
    addWish(item) {
      let wishs = JSON.parse(localStorage.getItem("wishs"))
      let newWishs = []
      if (wishs) {
        wishs.map(x => {
          newWishs.push(x)
        })
      }
  
        var data: Wish = {
          itemId: item._id,
          itemName: item.name,
          itemImgUrl: item.imgUrl,
          itemGender: item.gender,
          itemClassefication: item.classification,
          itemPrice:item.price,
          itemSizes: item.sizes,
          itemPurchases: item.purchases,
          userId: "",
          userName: "",
          userEmail: "",
          userPhone: 0,
          userAddress: "",
        }
      
  
      var re = newWishs.some(x => x.itemId === data.itemId)
      if (!re) {
        newWishs.push(data)
        localStorage.setItem('wishs', JSON.stringify(newWishs))
      } else {
        newWishs = newWishs.filter(x => x.itemId !== data.itemId)
        localStorage.setItem('wishs', JSON.stringify(newWishs))
      }
    }
}
