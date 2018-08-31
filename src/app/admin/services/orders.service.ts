import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrdersService{

    constructor(private http: Http, private router: Router){}

    getAllOrders(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/orders', options);
    }

}

export interface IOrder {
	name :string,
	type :number,
	original_width: number,
    original_height: number,
    code: string,
    description: string,
    image_url: string,
    phone: string,
    original_depth: number
}