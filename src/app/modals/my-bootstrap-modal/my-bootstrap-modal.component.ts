// my-bootstrap-modal.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../config/config.service';

import { timeout } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './my-bootstrap-modal.component.html',
  styleUrls: ['./my-bootstrap-modal.component.scss']
})
export class MyBootstrapModalComponent  {
  servererr = false
  loading = true
  notLogged = false
  done = false
  cart = []
  selectedSize
  totalPrice = 0
  noItems = true
  constructor(
    public activeModal: NgbActiveModal,
    public configService: ConfigService,
  ) { }




}