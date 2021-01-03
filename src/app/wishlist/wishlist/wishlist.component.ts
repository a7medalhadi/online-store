import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  itemList
  constructor(public config: ConfigService, private router: Router) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData(){
    this.itemList = JSON.parse(localStorage.getItem("wishs"))
  }

 

}
