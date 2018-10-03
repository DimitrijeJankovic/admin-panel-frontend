import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MaterialsService } from '../../../../services/materials.service'
import { OrderItemsService } from '../../../../services/order-items.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})

export class NewItemComponent{

    item: any = {
        material_id: null,
        quantity: null,
        order_id: null
    }

    materials: any

    problem: boolean = false
    fail: boolean = false
    success: boolean = false

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private orderItemsService: OrderItemsService,
        private materialsService: MaterialsService
    ){
        this.getAllMaterials()

        // get order id from url
        this.item.order_id = this.route.snapshot.queryParams['oID']

    }

    getAllMaterials(){
        this.materialsService.getAllMaterials().subscribe((res: any) => {
            this.materials = JSON.parse(res._body)
            
        })
    }

    saveOrderItem(){
        this.orderItemsService.newItem(this.item).subscribe((data: any) => {
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