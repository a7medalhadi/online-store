import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../../auth.service';
import { config } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchFor = history.state.data
  isLoading 
  itemsList
  noItem = false
  currentPage = 1;
  pager = {};
  pageOfItems =[]
  constructor(public configService: ConfigService,public auth:AuthService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(page?) {
    this.isLoading = true
    this.configService.searchItem(this.searchFor,page).subscribe(observer=>{
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
        if(diff >= 15){
          x.new = false
        }
        return x
      })
     this.isLoading = false
    })

  }
  }
  