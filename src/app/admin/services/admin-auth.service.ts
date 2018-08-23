import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminAuthService{

    constructor(private http: Http, private router: Router){}

    loginAdmin(email: string, password: string){
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        let options = new RequestOptions({headers: headers})
        let loginInfo = {
            "grant_type": "client_credentials",
            "client_id": email,
            "client_secret": password
        }
        
        return this.http.post(environment.serverUrl + '/oauth', JSON.stringify(loginInfo), options);
    }

    isAdminAuthenticated(){
        return !!sessionStorage.getItem('adminToken')
    }

}