import { Component, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { OrdersService } from '../../../services/orders.service'
import { ProducersService } from '../../../services/producers.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit{

    order_id: number
    sub: any

    order: any
    statuses: any
    countries: any
    deliveryTypes: any 

    load: boolean = false
    problem: boolean = false
    fail: boolean = false
    success: boolean = false
    

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private ordersService: OrdersService,
        private producersService: ProducersService,
        private datePipe: DatePipe,
    ) {

        setTimeout(() => {
            
            this.load = true

            this.getAllStatusTypes()
            this.getCountries()
            this.getAllDeliveryTypes()
            
        }, 200)
        
    }

    ngOnInit(): void {
        this.changeMeOnUpdate()
    }

    changeMeOnUpdate(){
        this.sub = this.route.params.subscribe(params => {
            var id = params.id
                
            this.ordersService.getOrder(id).subscribe((data: any) => {
                if(!data){
                    this.problem = true
                }else{
                    this.order = JSON.parse(data._body)[0]

                    this.order.date_created = (this.order.date_created)? new Date(this.order.date_created) : new Date()
                    this.order.date_in_progress = (this.order.date_in_progress)? new Date(this.order.date_in_progress) : null
                    this.order.date_finished = (this.order.date_finished)? new Date(this.order.date_finished) : null
                    this.order.date_delivery = (this.order.date_delivery)? new Date(this.order.date_delivery) : null
                    this.order.requested_date = (this.order.requested_date)? new Date(this.order.requested_date) : null
                    
                }
            },(error) => {
                this.problem = true
            })
        })
    }

    saveOrder() {
        this.order.date_created = (this.order.date_created)? this.datePipe.transform(this.order.date_created, 'y-MM-dd H:m:s') : this.datePipe.transform(new Date(), 'y-MM-dd H:m:s')
        this.order.date_in_progress = (this.order.date_in_progress)? this.datePipe.transform(this.order.date_in_progress, 'y-MM-dd H:m:s') : null
        this.order.date_finished = (this.order.date_finished)? this.datePipe.transform(this.order.date_finished, 'y-MM-dd H:m:s') : null
        this.order.date_delivery = (this.order.date_delivery)? this.datePipe.transform(this.order.date_delivery, 'y-MM-dd H:m:s') : null
        this.order.requested_date = (this.order.requested_date)? this.datePipe.transform(this.order.requested_date, 'y-MM-dd H:m:s') : null
        
        this.ordersService.editOrder(this.order, this.order.id).subscribe((data: any) => {
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

    getAllStatusTypes() {
        this.ordersService.getAllStatusTypes().subscribe((res: any) => {
            this.statuses = JSON.parse(res._body)
        })
    }

    getCountries() {
        this.producersService.getAllCountries().subscribe((res: any) => {
            this.countries = JSON.parse(res._body)
        })
    }

    getAllDeliveryTypes() {
        this.ordersService.getAllDeliveryTypes().subscribe((res: any) => {
            this.deliveryTypes = JSON.parse(res._body)
        })
    }

    addressFormControl = new FormControl('', [
        Validators.required,
    ]);
    address = new MyErrorStateMatcher();

    stateFormControl = new FormControl('', [
        Validators.required,
    ]);
    state = new MyErrorStateMatcher();

    selected = new FormControl(this.statuses, [
        Validators.required,
        Validators.pattern(this.statuses),
      ]);
    
    matcher1 = new MyErrorStateMatcher();

    selected2 = new FormControl(this.countries, [
        Validators.required,
        Validators.pattern(this.countries),
      ]);
    
    matcher2 = new MyErrorStateMatcher();

    piadStatus: any
    selected3 = new FormControl(this.piadStatus, [
        Validators.required,
        Validators.pattern(this.piadStatus),
      ]);
    
    matcher3 = new MyErrorStateMatcher();

    selected4 = new FormControl(this.deliveryTypes, [
        Validators.required,
        Validators.pattern(this.deliveryTypes),
      ]);
    
    matcher4 = new MyErrorStateMatcher();

    

}