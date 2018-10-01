import { Component } from '@angular/core'
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { OrdersService } from '../../../../services/orders.service'
import { ProducersService } from '../../../../services/producers.service'
import { OrdersPanelComponent } from '../../orders-panel.component'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.css']
})

export class NewOrderComponent{

    order: any = {
        date_created: new Date(),
        date_delivery: null,
        date_finished: null,
        date_in_progress: null,
        status_id: null,
        payment: null,
        price: null,
        delivery_price: null,
        adress: null,
        adress1: null,
        country: null,
        delivery_type_id: null
    }

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
        private panel: OrdersPanelComponent,
        private datePipe: DatePipe,
    ) {
        this.getAllStatusTypes()
        this.getCountries()
        this.getAllDeliveryTypes()
    }

    saveOrder() {
        this.order.date_created = (this.order.date_created)? this.datePipe.transform(this.order.date_created, 'y-MM-dd H:m:s') : this.datePipe.transform(new Date(), 'y-MM-dd H:m:s')
        this.order.date_in_progress = (this.order.date_in_progress)? this.datePipe.transform(this.order.date_in_progress, 'y-MM-dd H:m:s') : null
        this.order.date_finished = (this.order.date_finished)? this.datePipe.transform(this.order.date_finished, 'y-MM-dd H:m:s') : null
        this.order.date_delivery = (this.order.date_delivery)? this.datePipe.transform(this.order.date_delivery, 'y-MM-dd H:m:s') : null
        //this.order.requested_date = (this.order.requested_date)? this.datePipe.transform(this.order.requested_date, 'y-MM-dd H:m:s') : null

        this.ordersService.newOrder(this.order).subscribe((data: any) => {
            if(!data){
              this.fail = true
            }else{
                this.success = true
                setTimeout(()=>{
                    this.router.navigate(['admin/orders'])
                }, 1000);
            }
            },(error) => {
                this.fail = true
            })
    }

    cancelOrder(){
        var lastOrder = this.panel.ordersList[this.panel.ordersList.length - 1] 
        if(lastOrder.order_id == "New"){
            this.panel.ordersList.pop()
            this.router.navigate(['admin/orders/panel'])
        }else{
            this.router.navigate(['admin/orders/panel'])
        }
        
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