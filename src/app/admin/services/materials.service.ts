import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class MaterialsService{

    constructor(private http: Http, private router: Router){}

    getAllMaterials(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/materials', options);
    }

    getAllTypes(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + '/material-types', options);
    }
    
    newMaterials(name: string, material: string, width: number, height: number,
        depth: number, code: string, desc: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        let newMaterial = {
            "name": name, "type": material, "width": width, "height": height,
            "code": code, "desc": desc, "depth": depth
        }
        console.log(newMaterial);
        
        return this.http.post(environment.serverUrl + '/materials', newMaterial, options)
    }

    deleteMaterials(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        
        return this.http.delete(environment.serverUrl + '/materials/'+id, options)
    }
/*

     getMaterials(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/materials/${id}`, options);
    }

    editMaterials(name: string, address :string, address1: string, city: string,
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
        
        return this.http.put(environment.serverUrl + '/materials/'+id, editProducer, options)
    }
*/
}

export interface IMaterials {
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