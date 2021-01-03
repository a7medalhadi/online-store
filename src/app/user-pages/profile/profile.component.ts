import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../../auth.service';
import { UserDetails } from '../../interfaces/authconfig';
import { User } from '../../config/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  serverer
  details : UserDetails = {
    _id: "",
    email: "",
    name: "",
    phone: "",
    address:"",
    gender:"",
    verified:false,
    exp:0,
    iat:0
  }
  user:User={
    name : "",
    email: "",
    address:"",
    gender: "",
    phone: ""
  }

  done = false
  loading = false 

  constructor(public configService:ConfigService,public auth:AuthService) { }

  ngOnInit() {
    this.fetchData()
  }
  sendData(){
    this.serverer = false
    this.loading = true
    this.configService.updateUser(this.user,this.details._id).subscribe(()=>{
      this.done = true
      this.loading = false
      console.log('done')},(err)=>{ 
        console.log(err.error.message)
        this.serverer = true
        this.loading = false
      })
  }

  fetchData(){
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(this.details)
      this.userInfo()
    }, (err) => {
      this.fetchData()
      console.error(err);
    });
  }

  userInfo(){
    this.user.name = this.details.name
    this.user.email = this.details.email
    this.user.address = this.details.address
    this.user.gender = this.details.gender
    this.user.phone = this.details.phone
  }
  }
