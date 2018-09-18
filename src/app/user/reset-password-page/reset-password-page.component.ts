import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
    templateUrl: './reset-password-page.component.html',
    styleUrls: ['./reset-password-page.component.css']
})

export class ResetPasswordPageComponent implements OnInit{

    passInvalid: boolean = false
    validPass: boolean = false
    noValidToken: boolean = false
    linkExpired: boolean = false
    error: boolean = false

    tokenNotFound: boolean = false
    tokenExpired: boolean = false
    

    token:string

    constructor(
        private router: Router, 
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe((par: Params) => {
            if(par.token){ this.token = par.token }
        })
    }

    ngOnInit() {
        this.validToken()
    }

    validToken(){
        this.authService.validToken(this.token).subscribe((res: any) => {
        },(error) => {
            if(JSON.parse(error._body).status == 404 || this.token == null){
                this.tokenNotFound = true
            }

            if(JSON.parse(error._body).status == 498){
                this.tokenExpired = true
            }
        })
    }

    saveUserPass(formValues){

        if(formValues.newPass !== formValues.confPass){
            this.passInvalid = true
        }else if(!this.token){
            this.noValidToken = true
        }else{
            
            this.authService.newPassword(this.token ,formValues.newPass).subscribe((data:any) => {
                if(!data){
                    this.error = true
                }else{
                    this.validPass = true
                    setTimeout(() => {
                        this.router.navigate(['user/login']) 
                    }, 3000);
                }
            },(error) => {
                this.error = true
            })
        }
    }
}