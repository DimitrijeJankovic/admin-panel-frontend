import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { OrderItemsService } from '../../services/order-items.service'
import { MaterialsService } from '../../services/materials.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: "new-order-items",
    templateUrl: './order-items.component.html',
    styleUrls: ['./order-items.component.css']
})

export class OrderItemsComponent{

    @Input() orderItem: any

    materials: any

    fail: boolean = false
    success: boolean = false 

    constructor(private orderItemsService: OrderItemsService,
                private materialsService: MaterialsService,
                private router: Router,
    ){
        this.getAllMaterials()
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

    saveOrderItem(){
        this.orderItemsService.orderItem(this.orderItem).subscribe((data: any) => {
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

    getAllMaterials(){
        this.materialsService.getAllMaterials().subscribe((res: any) => {
            this.materials = JSON.parse(res._body)
            
        })
    }

}