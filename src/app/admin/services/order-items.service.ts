import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrderItemsService{

    constructor(private http: Http, private router: Router){}

    getAllOrderitems(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/order-items', options);
    }

    getOrder(id: number){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/order-items/${id}`, options);
    }

    editItem(orderItem: any, id:number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let editOrderItem = {
            "material_id": orderItem.material_id,
            "order_id": orderItem.order_id,
            "quantity": orderItem.quantity
        }

        return this.http.put(environment.serverUrl + `/order-items/${id}`, editOrderItem, options)
    }

    newItem(orderItem: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let newOrderItem = {
            "material_id": orderItem.material_id,
            "order_id": orderItem.order_id,
            "quantity": orderItem.quantity
        }
        console.log(newOrderItem);
        
        return this.http.post(environment.serverUrl + '/order-items', newOrderItem, options)
    }

    deleteItemPhoto(id: number){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        
        return this.http.delete(environment.serverUrl + `/order-item-photo/${id}`, options); 
    }

}

export interface IOrderItem {
	id :string,
	order_id :number,
	material_id: number,
    quantity: number
}