import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { CancelingModalComponent } from '../../modals/canceling-modal/canceling-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetails } from '../../interfaces/authconfig';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  user : UserDetails
  result 
  ordersList
  theDate
  loaded = false
  constructor(public auth: AuthService, public configServic: ConfigService, public modalService: NgbModal) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
    this.auth.profile().subscribe(user=>{
      this.user = user
      this.configServic.getOrder(this.user._id).subscribe(observer=>{
        console.log(observer)
        observer.done.map(x=>{
          observer.result.push(x)
        })
        this.ordersList = observer.result
        this.loaded = true
        console.log(this.ordersList.length)
        
      })

    }, (err) => {
      console.error(err);
    })

  }

  openMediumModal(id) {
    console.log(id)
    const modalRef = this.modalService.open( CancelingModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.fromParent = id
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }
}
