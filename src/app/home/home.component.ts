import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import swiper from 'swiper/bundle';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  step = 1
  step2 = 1
  wList
  mList
  hList
  dList
  mySwiper1: swiper
  mySwiper2: swiper
  act = true
  constructor(private config: ConfigService) { }
  ngAfterViewInit() {
    this.fetchingData()
  }
  ngOnInit() {
    (($) => {
      /*------------------
          Background Set
      --------------------*/
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      });
      /*------------------
          Hero Slider
      --------------------*/
      $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i style="font-size: 30px; position: absolute;left: 40px;top: 45%;color: #252525;" class="ti ti-angle-left"> </i>', '<i style="font-size: 30px; position: absolute;left: auto;	right: 40px;top: 45%;color: #252525;" class="owlnext ti ti-angle-right"></i > '],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
      }).on('changed.owl.carousel', (e) => {
        this.act = false
        this.sleep(0).then(() => this.act = true)
        console.log(this.act)
      });

      /*------------------
          Product Slider
      --------------------*/
      $(".product-slider").owlCarousel({
        loop: true,
        margin: 25,
        nav: true,
        items: 4,
        dots: true,
        navText: ['<i style="font-size: 30px; position: absolute;left: 40px;top: 45%;color: #252525;" class="ti ti-angle-left"> </i>', '<i style="font-size: 30px; position: absolute;left: auto;	right: 40px;top: 45%;color: #252525;" class="owlnext ti ti-angle-right"></i > '],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 2,
          },
          992: {
            items: 2,
          },
          1200: {
            items: 2,
          }
        }
      });
    })(jQuery);
  }

  swiper() {
    this.mySwiper1 = new swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        770: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        952: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },

    })
  }
  swiper2() {
    this.mySwiper1 = new swiper('.swiper-container2', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10

        },
        576: {
          slidesPerView: 2,
          spaceBetween: 5
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 5

        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 2

        }
      },

    })

  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  /*-------------------------------
        Fetching data from server
  -------------------------------*/
  fetchingData() {
    this.menData('Shoes')
    this.womenData('Shoes')
    this.descData()
    this.hotData()
  }


  menData(classify) {
    var gendry = 'Men'
    var classify = classify
    this.config.getSomeItem(classify, gendry).subscribe(observer => {
      this.mList = observer
      this.mList = this.correctore(this.mList)
      this.sleep(40).then(() => this.swiper2())
    })
  }


  womenData(classify) {
    var gendry = 'Women'
    var classify = classify
    this.config.getSomeItem(classify, gendry).subscribe(observer => {
      this.wList = observer
      this.wList = this.correctore(this.wList)
      this.sleep(40).then(() => this.swiper2())

    })
  }


  descData() {
    this.config.getDescItems().subscribe(observer => {
      this.dList = observer
      this.dList = this.correctore(this.dList)
      this.sleep(20).then(() => this.swiper())

    })
  }


  hotData() {
    this.config.getHotItems().subscribe(observer => {
      this.hList = observer
      this.hList = this.correctore(this.hList)
    })
  }


  correctore(arr) {
    var newArr = arr.map(x => {
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
    return newArr
  }
}
