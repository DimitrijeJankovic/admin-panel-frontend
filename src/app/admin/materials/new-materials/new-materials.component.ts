import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { MaterialsService } from '../../services/materials.service'

@Component({
    templateUrl: './new-materials.component.html',
    styleUrls: ['./new-materials.component.css']
})

export class NewMaterialsComponent{

    newMaterial:boolean = false
    notCreated: boolean = false
    emptyfelds:boolean = false
    noTypes: boolean = false

    types: any[] = []

    constructor(
        private router: Router,
        private materialsService: MaterialsService
    ){
        this.getMatirilasTypes();
    }

    saveMaterial(formValues){
        if(formValues.material == null){ 
            this.emptyfelds = true 
        }else{  
            this.materialsService.newMaterials(formValues.name, formValues.material, formValues.width, formValues.height,
                formValues.depth, formValues.code, formValues.desc).subscribe((data: any) => {
                if(!data){
                  this.notCreated = true
                }else{
                  this.router.navigate(['/admin/materials'])
                }
              },(error) => {
                this.notCreated = true
              })
        }
    }

    getMatirilasTypes(){
        this.materialsService.getAllTypes().subscribe((data: any) => {
            if(!data){
                this.noTypes = true
            }else{
                this.types = JSON.parse(data._body)
            }
        },(error) => {
            this.noTypes = true
        })
    }

    cancel(){
        this.router.navigate(['/admin/materials'])
    }

}