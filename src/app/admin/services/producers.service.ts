import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProducersService{

    constructor(private http: Http, private router: Router){}

    getAllProducers(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/producers', options);
    }

    getAllCountries(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/countries', options);
    }

    getProducer(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/producers/${id}`, options);
    }

    newProducers(name: string, address :string, address1: string, city: string,
                state: string, country: string, email: string, phone: string,
                web: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        let newProducer = {
            "name": name, "address": address, "address1": address1,
            "city": city, "state": state, "country": country,
            "email": email, "phone": phone, "web": web
        }
        
        return this.http.post(environment.serverUrl + '/producers', newProducer, options)
    }

    editProducers(name: string, address :string, address1: string, city: string,
                 state: string, country: string, email: string, phone: string,
                 web: string, id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        let editProducer = {
            "name": name, "address": address, "address1": address1,
            "city": city, "state": state, "country": country,
            "email": email, "phone": phone, "web": web
        }
        
        return this.http.put(environment.serverUrl + '/producers/'+id, editProducer, options)
    }

    deleteProducer(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        
        return this.http.delete(environment.serverUrl + '/producers/'+id, options)
    }

}

export interface IProducers {
	name :string,
	address :string,
	address1: string,
    city: string,
    state: string,
    country: number,
    email: string,
    phone: string,
    web: string
}