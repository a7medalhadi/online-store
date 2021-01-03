import { Component, OnInit } from '@angular/core';
import { LogLoad } from '../../interfaces/authconfig'
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors = []
  loading = false
  credentials: LogLoad = {
    email: '',
    password: ''
  };
  constructor(public auth: AuthService, private router: Router,public config:ConfigService) { }
  ngOnInit() {
  }
  login() {
    this.errors = []
    this.loading = true
    this.auth.login(this.credentials).subscribe(res => {
      this.loading = false
      this.router.navigateByUrl('/general-pages/blank-page')      
    }, (err) => {
      this.loading = false
      if(err.error.message){
        this.errors.push(err.error.message)
      }else{
        this.errors.push('مشكلة في اتصال الخادم')
      }
      console.error(err);
    }); 
  }

  resetPassword(){
    this.router.navigateByUrl('user/forgot-password')

  }
}
