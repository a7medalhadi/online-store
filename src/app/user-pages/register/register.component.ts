import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../../interfaces/authconfig'
import { AuthService } from '../../auth.service';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors = []
  loading = false
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    phone:'',
    address:'',
    gender:''
  };
  constructor(public auth : AuthService, private router: Router) {  }

  ngOnInit() {
  }
  register() {
    this.errors = []
    this.loading = true
    this.auth.register(this.credentials).subscribe(() => {
      this.loading = false
      this.router.navigateByUrl('/');
    }, (err) => {
      this.loading = false
      this.errors.push(err.error.message)
      console.error(err);
    });
  }
}
