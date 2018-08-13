import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInvalid:boolean = false

  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit() {}

  login(formValues){
    this.authService.loginUser(formValues.userName ,formValues.password).subscribe((data:any) => {
      if(!data){
        this.loginInvalid = true
      }else{
        sessionStorage.setItem('token', JSON.parse(data._body).access_token);
        this.router.navigate(['events'])
      }
    },(error) => {
      this.loginInvalid = true
    })
  }

  forgatPass(){
    this.router.navigate(['user/forgot-password']) 
  }

}
