import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrderItemElementsService{

    constructor(private http: Http, private router: Router){}

    getAllOrderItemElements(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/order-item-elements', options);
    }

}

export interface IOrderItemElement {
	id :number,
	order_item_id :number,
	width: number,
    height: number,
    direction: string
}