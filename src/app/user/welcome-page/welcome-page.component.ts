import { Component } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent{

    invalidCode: boolean = false
    userActivated: boolean = false
    userNotActivated: boolean = false

    code:number

    constructor(
        private router: Router, 
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ){
        this.activatedRoute.queryParams.subscribe((par: Params) => {
            if(par.code){ this.code = par.code }
            else{ this.invalidCode = true }
        })

        this.confirm()
    }

    confirm(){
        if(this.code){
            this.authService.confirmRegitration(this.code).subscribe((res) => {
                this.userActivated = true
                setTimeout(() => {
                    this.router.navigate(['user/login']) 
                }, 3000);
            },(error) => {
                this.userNotActivated = true
            })
        }
    }

}