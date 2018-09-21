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

    orderItem(orderItem: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let newOrderItem = {
            "id": orderItem.id,
            "material_id": orderItem.material_id,
            "order_id": orderItem.order_id,
            "quantity": orderItem.quantity
        }

        return this.http.post(environment.serverUrl + '/order-items', newOrderItem, options)
    }

}

export interface IOrderItem {
	id :string,
	order_id :number,
	material_id: number,
    quantity: number
}