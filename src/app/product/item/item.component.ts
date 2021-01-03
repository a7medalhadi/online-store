import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ActivatedRoute } from '@angular/router';


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
  constructor(public configService: ConfigService, public activatedroute: ActivatedRoute) { }

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
  nav(){
    
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
}
