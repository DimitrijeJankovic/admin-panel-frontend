import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from "rxjs"

@Injectable()
export class AuthService {

    currentUser:IUser

    constructor( private http:Http ){}

    loginUser(userName: string, password: string){
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        let options = new RequestOptions({headers: headers})
        let loginInfo = {
            "grant_type": "client_credentials",
            "client_id": userName,
            "client_secret": password
        }

        return this.http.post('http://admin-panel.com:450/oauth', JSON.stringify(loginInfo), options);
    }

    newUser( firstName: string, lastName: string, userName: string, email: string, password: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let options = new RequestOptions({headers: headers})
        let newUser = {
            "first_name": firstName,
            "last_name": lastName,
            "password": password,
            "username": userName,
            "email": email 
        }

        return this.http.post('http://admin-panel.com:450/user', JSON.stringify(newUser), options);
    }

    resetPassword(email: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let options = new RequestOptions({headers: headers})
        let newPass = {
            "email": email 
        }

        return this.http.post('http://admin-panel.com:450/forgot-password', JSON.stringify(newPass), options);
    }

    isAuthenticated(){
        return !!sessionStorage.getItem('token')
    }

    updateCurrentUser(firstName:string ,lastName:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
    }

    isLoginPage(){
        return true
    }

}