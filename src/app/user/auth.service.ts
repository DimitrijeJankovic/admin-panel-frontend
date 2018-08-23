import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from "rxjs"
import { environment } from '../../environments/environment';

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
        
        return this.http.post(environment.serverUrl + '/oauth', JSON.stringify(loginInfo), options);
    }

    getUser(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        })
        let options = new RequestOptions({headers: headers})

        return this.http.get(environment.serverUrl + '/user', options)
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

        return this.http.post(environment.serverUrl + '/user', JSON.stringify(newUser), options);
    }

    confirmRegitration(code: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/welcome-code?code='+code, options);
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

        return this.http.post(environment.serverUrl + '/forgot-password', JSON.stringify(newPass), options);
    }

    newPassword(token: string, pass: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let options = new RequestOptions({headers: headers})
        let newPass = {
            "reset": {
                "token": token,
                "newPassword": pass
            }
        }
        
        return this.http.put(environment.serverUrl + '/forgot-password', newPass, options);
    }

    validToken(token: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let options = new RequestOptions({headers: headers})
        let validToken = {
            "token": token,
        }
        
        return this.http.post(environment.serverUrl + '/valid-token', validToken, options);
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