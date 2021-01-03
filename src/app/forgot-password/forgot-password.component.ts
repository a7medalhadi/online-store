import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  done
  errors = []
  loading = false
  credentials  = {
    email: '',
  };
  constructor(public config: ConfigService) { }

  ngOnInit() {
  }

  resetPassword() {
    this.errors = []

    if(!this.credentials.email){
      this.errors.push ("أدخل البريد الالكتروني رجاءا")
    }else{
      this.loading = true
      this.config.resetPassword(this.credentials).subscribe(()=>{
        this.loading = false
        this.done = ".تم ارسال رسالة في بريدك الالكتروني"
      }, (err) => {
        this.loading = false
        this.errors.push(err.error.message)
        console.log(err.error.message)
        console.error(err);
      }); 
    }

  }

}
