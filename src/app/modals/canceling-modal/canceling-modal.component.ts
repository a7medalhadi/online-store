import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-canceling-modal',
  templateUrl: './canceling-modal.component.html',
  styleUrls: ['./canceling-modal.component.scss']
})
export class CancelingModalComponent implements OnInit {
  done = false
  loading = false
  serverer = false
  @Input() fromParent;

  constructor(    public activeModal: NgbActiveModal,
    public configService: ConfigService,
  ) { }

  ngOnInit() {
    console.log(this.fromParent)
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  cancelOrder(){
    this.loading = true
    this.configService.deleteOrder(this.fromParent).subscribe(()=>{
      console.log('deleted')
      this.done = true
      this.loading = false
    },(err)=>{
      this.serverer = true
    })
  }
}
