import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrderItemElementsService } from '../../../services/order-item-elements.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})

export class ElementComponent implements OnInit{

    sub: any
    element: any

    load: boolean = false
    problem: boolean = false
    fail: boolean = false
    success: boolean = false

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private orderItemElementsService: OrderItemElementsService,
    ){
        setTimeout(() => {
            this.load = true
        }, 200)
    }

    ngOnInit(): void {
        this.changeMeOnUpdate()
    }

    changeMeOnUpdate(){
        this.sub = this.route.params.subscribe(params => {
            var id = params.id
                
            this.orderItemElementsService.getOrderItemElement(id).subscribe((data: any) => {
                if(!data){
                    this.problem = true
                }else{
                    this.element = JSON.parse(data._body)[0]
                    console.log(this.element);
                    
                }
            },(error) => {
                this.problem = true
            })
        })
    }

    saveElement(){
        this.orderItemElementsService.itemElement(this.element).subscribe((data: any) => {
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