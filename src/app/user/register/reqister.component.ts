import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IUser } from '../user.model'
import { AuthService } from '../auth.service'

@Component({
    templateUrl: './reqister.component.html',
    styleUrls: ['./reqister.component.css']
})

export class ReqisterComponent implements OnInit {

    newUserInvalid: boolean = false
    userCreated: boolean = false

    constructor(private router: Router, private authService: AuthService) { }

    newUser: FormGroup

    firstName: FormControl
    lastName: FormControl
    userName: FormControl
    email: FormControl
    password: FormControl
    confPass: FormControl

    ngOnInit() {
        this.firstName = new FormControl('', Validators.required)
        this.lastName = new FormControl('', Validators.required)
        this.userName = new FormControl('', Validators.required)
        this.email = new FormControl('', Validators.required)
        this.password = new FormControl('', Validators.required)
        this.confPass = new FormControl('', Validators.required)

        this.newUser = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.password,
            confPass: this.confPass
        })

    }

    saveUser(formValues) {
        let newUser: IUser = {
            id: undefined,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            userName: formValues.userName,
            email: formValues.email,
            password: formValues.password
        }

        this.authService.newUser(
            formValues.firstName,
            formValues.lastName,
            formValues.userName,
            formValues.email,
            formValues.password
        ).subscribe((data: any) => {
            if (!data) {
                this.newUserInvalid = true
            } else {
                this.userCreated = true
                setTimeout(() => { 
                    this.router.navigate(['user/login']) 
                }, 3000);
                
            }
        }, (error) => {
            this.newUserInvalid = true
        })


    }

    back() {
        this.router.navigate(['/user/login'])
    }

}