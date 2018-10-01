import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrderItemElementsService } from '../../../../services/order-item-elements.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './new-element.component.html',
    styleUrls: ['./new-element.component.css']
})

export class NewElementComponent{

    element: any = {
        width: null,
        height: null,
        order_items_id: null
    }

    problem: boolean = false
    fail: boolean = false
    success: boolean = false

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private orderItemElementsService: OrderItemElementsService,
    ){
        // get order id from url
        this.element.order_items_id = this.route.snapshot.queryParams['iID']
    }

    saveElement(){
        this.orderItemElementsService.newItemElement(this.element).subscribe((data: any) => {
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

    widthFormControl = new FormControl('', [
        Validators.required,
    ]);
    width = new MyErrorStateMatcher();

    heightFormControl = new FormControl('', [
        Validators.required,
    ]);
    height = new MyErrorStateMatcher();
}