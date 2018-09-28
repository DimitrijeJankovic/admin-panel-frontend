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

    getOrderItemElement(id: number){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/order-item-elements/${id}`, options);
    }

    itemElement(itemElement: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let newItemElement = {
            "id": itemElement.id,
            "order_items_id": itemElement.order_items_id,
            "width": itemElement.width,
            "height": itemElement.height
        }

        return this.http.post(environment.serverUrl + '/order-item-elements', newItemElement, options)
    }

}

export interface IOrderItemElement {
	id :number,
	order_item_id :number,
	width: number,
    height: number,
    direction: string
}