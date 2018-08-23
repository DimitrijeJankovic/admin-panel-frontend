import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent{

    loginInvalid:boolean = false

    constructor(
        private authService:AdminAuthService, 
        private router:Router){
          if(sessionStorage.getItem('adminToken')){
            this.router.navigate(['/admin'])
          }
        }


        login(formValues){
            this.authService.loginAdmin(formValues.userEmail ,formValues.password).subscribe((data:any) => {
              if(!data){
                this.loginInvalid = true
              }else{
                sessionStorage.setItem('adminToken', JSON.parse(data._body).access_token);
                this.router.navigate(['/admin'])
              }
            },(error) => {
              this.loginInvalid = true
            })
          }

    forgatPass(){

    }
}
