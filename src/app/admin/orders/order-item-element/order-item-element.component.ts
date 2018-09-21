import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrderItemElementsService } from '../../services/order-item-elements.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: "new-order-element",
    templateUrl: './order-item-element.component.html',
    styleUrls: ['./order-item-element.component.css']
})

export class OrderItemElementComponent{

    @Input() itemElement: any

    fail: boolean = false
    success: boolean = false 

    constructor(private elementsService: OrderItemElementsService,
                private router: Router,
    ) {}

    heightFormControl = new FormControl('', [
        Validators.required,
    ]);
    height = new MyErrorStateMatcher();

    widthFormControl = new FormControl('', [
        Validators.required,
    ]);
    width = new MyErrorStateMatcher();

    saveElement(){
        this.elementsService.itemElement(this.itemElement).subscribe((data: any) => {
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


}