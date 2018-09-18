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


     getMaterial(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })
        let options = new RequestOptions({headers: headers})
        
        return this.http.get(environment.serverUrl + `/materials/${id}`, options);
    }

    editMaterial(name: string ,material: number, width: number, height: number, 
        depth: number, code: string, desc: string, id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        let editMaterial = {
            "name": name  ,"material": material, "width": width, 
            "height": height, "depth": depth, "code": code, "desc": desc
        }
        
        return this.http.put(environment.serverUrl + '/materials/'+id, editMaterial, options)
    }

    deleteMaterialPhoto(id: number){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('adminToken')
        })

        let options = new RequestOptions({headers: headers})
        
        return this.http.delete(environment.serverUrl + '/materials-photo/'+id, options) 
    }

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