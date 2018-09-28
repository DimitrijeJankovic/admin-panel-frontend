import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MaterialsService } from '../../../services/materials.service'
import { OrderItemsService } from '../../../services/order-items.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})

export class IitemComponent implements OnInit{

    sub: any
    item: any
    materials: any

    load: boolean = false
    problem: boolean = false
    fail: boolean = false
    success: boolean = false

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private orderItemsService: OrderItemsService,
        private materialsService: MaterialsService
    ){
        setTimeout(() => {
            this.load = true
            this.getAllMaterials()
        }, 200)
    }

    ngOnInit(): void {
        this.changeMeOnUpdate()
    }

    changeMeOnUpdate(){
        this.sub = this.route.params.subscribe(params => {
            var id = params.id
                
            this.orderItemsService.getOrder(id).subscribe((data: any) => {
                if(!data){
                    this.problem = true
                }else{
                    this.item = JSON.parse(data._body)[0]
                }
            },(error) => {
                this.problem = true
            })
        })
    }

    getAllMaterials(){
        this.materialsService.getAllMaterials().subscribe((res: any) => {
            this.materials = JSON.parse(res._body)
            
        })
    }

    saveOrderItem(){
        this.orderItemsService.editItem(this.item, this.item.id).subscribe((data: any) => {
            if(!data){
              this.fail = true
            }else{
                this.success = true
                setTimeout(()=>{
                    this.router.navigate(['admin/orders'])
                }, 2000);
            }
          },(error) => {
            this.fail = true
          })
        
    }


    selected = new FormControl(this.materials, [
        Validators.required,
        Validators.pattern(this.materials),
      ]);
    
    matcher1 = new MyErrorStateMatcher();

    quantityFormControl = new FormControl('', [
        Validators.required,
    ]);
    quantity = new MyErrorStateMatcher();
}