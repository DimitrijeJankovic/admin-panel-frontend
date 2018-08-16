import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    .newEvent { padding: 0 40px; padding-top: 35px; color: white; }
    em { float:right; color: #E05C65; padding-left: 10px; }
    .error input { background-color: #E3C3C5; }
    .error ::-webkit-input-placeholder { color:#999 }
    .error ::-moz-placeholder { color:#999 }
    .error :-moz-placeholder { color:#999 }
    .error ::ms-input-placeholder { color:#999 }
  `]
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router){}

  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl

  ngOnInit() {

    this.firstName = new FormControl('Dika', [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl('Jankovic', [Validators.required, Validators.pattern('[a-zA-Z].*')])

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValue){
    if(this.profileForm.valid){
      this.auth.updateCurrentUser(formValue.firstName ,formValue.lastName)
      this.router.navigate(['events'])
    }  
  }

  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName(){
    return this.lastName.valid || this.lastName.untouched
  }

  cancle(){
    this.router.navigate(['events'])
  }

}