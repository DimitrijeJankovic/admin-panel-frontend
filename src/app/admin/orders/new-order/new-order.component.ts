import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service'
import { OrdersService, IOrder } from '../../services/orders.service'

@Component({
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.css']
})

export class NewOrderComponent implements OnInit{

    ordersList: IOrder

    showOrder: boolean = false
    showItem: boolean = false
    showElement: boolean = false

    value:any

    constructor(private sideBar: SidebarService,
                private ordersService: OrdersService,
                private router: Router){}

    ngOnInit(){
        this.sideBar.hide()
        this.getAllOrders()
    }

    getAllOrders(){
        this.ordersService.getOrdersLeyaout().subscribe((prod: any) => {
            this.ordersList = JSON.parse(prod._body)
        })
    }

    cancel(){
        this.router.navigate(['/admin/orders'])
    }

    newItem(item: string, value){
        if(item === 'order'){
            this.showOrder = true 
            this.showItem = false 
            this.showElement = false 

            this.value = value
        }
        else if(item == 'item'){ 
            this.showItem = true 
            this.showOrder = false 
            this.showElement = false
            
            this.value = value
        }
        else{ 
            this.showElement = true 
            this.showItem = false 
            this.showOrder = false
            
            this.value = value
        }
    }
}