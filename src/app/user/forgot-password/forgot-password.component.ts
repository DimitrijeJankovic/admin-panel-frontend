import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    mailSend: boolean = false
    mailExists: boolean = false

    constructor(private router: Router, private authService: AuthService) { }

    rest: FormGroup

    email: FormControl

    ngOnInit(){
        this.email = new FormControl('', Validators.required)

        this.rest = new FormGroup({
            email: this.email
        })
    }

    restPass(formValues){
        let newPass = { email: formValues.email }

        this.authService.resetPassword(formValues.email).subscribe((data: any) => {
            if (!data) {
                this.mailExists = true
            } else {
                this.mailSend = true
                setTimeout(() => { 
                    this.router.navigate(['user/login']) 
                }, 3000);
                
            }
        }, (error) => {
            this.mailExists = true
        })
    }

    back(){
        this.router.navigate(['/user/login'])
    }
}