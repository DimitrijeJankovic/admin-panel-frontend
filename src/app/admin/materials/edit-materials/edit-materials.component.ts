import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialsService } from '../../services/materials.service'

@Component({
    templateUrl: './edit-materials.component.html',
    styleUrls: ['./edit-materials.component.css']
})

export class EditMaterialsComponent implements OnInit{

    editedMaterial:boolean = false
    notCreated: boolean = false
    emptyfelds:boolean = false
    noTypes: boolean = false
    problem: boolean = false

    types: any[] = []
    material = {}
    materialId = null;

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private materialsService: MaterialsService
    ){
        this.materialId = +this.route.snapshot.paramMap.get('id')
        this.getMatirilaTypes();
    }

    ngOnInit(){
        this.materialsService.getMaterial(this.materialId).subscribe((data: any) => {
            if(!data){
                this.problem = true
            }else{
                this.material = JSON.parse(data._body)
                this.material = this.material[0]    
            }
        },(error) => {
            this.problem = true
        })
    }

    editMaterial(formValues){
        if(formValues.material == null){ 
            this.emptyfelds = true 
        }else{
            this.materialsService.editMaterial(formValues.name ,formValues.material, formValues.width,
                    formValues.height, formValues.depth, formValues.code, formValues.desc, this.materialId).subscribe((data: any) => {
                if(!data){
                  this.notCreated = true
                }else{
                    this.editedMaterial = true
                    this.router.navigate(['/admin/materials'])
                }
              },(error) => {
                this.notCreated = true
              })
        }
    }

    getMatirilaTypes(){
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