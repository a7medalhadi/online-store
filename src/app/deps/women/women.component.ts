import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../interfaces/authconfig';
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {
  gendary = "Women"
  pag = 2
  currentPage = 1;
  pager = {};
  pageOfItems = []
  classify = {
    shoes: true,
    accessories: true
  }
  brand = []
  brands
  brandObj
  arrang = ""
  isLoading = true
  user: UserDetails
  error
  thePage
  constructor(public configService: ConfigService, public auth: AuthService) { }

  ngOnInit() {
    this.fetchBrand()
  }


  fetchBrand(){
    this.configService.getBrands().subscribe(observer=>{
      this.brands = observer
      this.brands = this.brands.map(x=> x.brand).filter (function (value, index, array) { 
        return array.indexOf (value) == index;
    });
      this.brand = this.brands.reduce(function(acc, cur, i) {
        acc[cur] = true;
        return acc;
      }, {});
      this.brandObj =  Object.keys(this.brand)
      .map(key => ({name: key, selected: this.brand[key]}));
      this.fetchData()

    })

  }

  brander(brandi){
    this.brand[brandi] = !this.brand[brandi]
    this.brandObj =  Object.keys(this.brand)
    .map(key => ({name: key, selected: this.brand[key]}));
    this.fetchData()

  }

  fetchData(page?) {
      this.error = null
      this.isLoading = true
      var classify = []
      let brand = []
      let thePage = []
      if (this.classify.accessories) {
        classify.push('Accessories')
        thePage.push('اكسسوارات')
      }
      if (this.classify.shoes) {
        classify.push('Shoes')
        thePage.push('أحذية')
      }
      for(var x=0 ; x<this.brandObj.length;x++){
        if(this.brandObj[x].selected){
          brand.push(this.brandObj[x].name)
        }
      }
      var filter = {
        classify: classify.join(' '),
        brand: brand.join(' ')
      }
      this.configService.filterItem(this.gendary, filter, page).subscribe(observer => {
        console.log(observer)
        this.pager = observer.pager;
        this.pageOfItems = observer.pageOfItems;
        this.pageOfItems = this.pageOfItems.map(x => {
          if (x.purchases >= "15") {
            x.hot = true
          }
          var today = new Date();
          var createdOn = new Date(x.date);
          var msInDay = 24 * 60 * 60 * 1000;
          createdOn.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0)
          var diff = (+today - +createdOn) / msInDay
          if (diff >= 15) {
            x.new = false
          }
          return x
        })
        console.log(this.pageOfItems)
        this.isLoading = false
        if (this.pageOfItems && this.pageOfItems.length == 0) {
          this.error = '!لم نعثر على مطابقة'
        }
      }, (err) => {
        this.isLoading = false
        if (err.status = 404) {
          this.error = '!لم نعثر على مطابقة'
        } else {
          this.error = '!مشكلة في الاتصال بالخادم'
        }
      })
    }

  sort() {
    if (this.arrang == "الأرخص") {
      this.pageOfItems.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    } else { this.fetchData() }
  }

}
