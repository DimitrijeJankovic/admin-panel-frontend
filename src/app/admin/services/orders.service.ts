import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrdersService{

    constructor(private http: Http, private router: Router){}

    getAllOrders(){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/orders', options);
    }

    getOrder(id: number){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/orders/${id}`, options);
    }

    // for new order page, folder structure
    getOrdersLeyaout(){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/orders-folder-leyaout', options);
    }

    //get all statuses for orderes
    getAllStatusTypes(){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/order-status', options);
    }

    getAllDeliveryTypes(){
        let headers = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/delivery-type', options);
    }

    editOrder(order: any, id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let editOrder = {
            "adress": order.adress,
            "adress1": order.adress1,
            "country": order.country,
            "date_created": order.date_created,
            "date_delivery": order.date_delivery,
            "date_finished": order.date_finished,
            "date_in_progress": order.date_in_progress,
            "delivery_type_id": order.delivery_type_id,
            "payment": order.payment,
            "price": order.price,
            "state": order.state,
            "status_id": order.status_id,
            "supplied_by_users_id": order.supplied_by_users_id
        }
        
        return this.http.put(environment.serverUrl + `/orders/${id}`, editOrder, options)
    }


    newOrder(order: any){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        
        let options = new RequestOptions({headers: headers})
        let newOrder = {
            "adress": order.adress,
            "adress1": order.adress1,
            "country": order.country,
            "date_created": order.date_created,
            "date_delivery": order.date_delivery,
            "date_finished": order.date_finished,
            "date_in_progress": order.date_in_progress,
            "delivery_type_id": order.delivery_type_id,
            "payment": order.payment,
            "price": order.price,
            "state": order.state,
            "status_id": order.status_id,
            "supplied_by_users_id": order.supplied_by_users_id
        }
        
        return this.http.post(environment.serverUrl + '/orders', newOrder, options)
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
    original_depth: number,
    order_items: any
}