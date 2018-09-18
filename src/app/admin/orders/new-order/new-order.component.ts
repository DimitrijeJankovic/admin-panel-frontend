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

    newItem(item){
        if(item === 'order'){ this.showOrder = true; }
        else if(item == 'item'){ this.showItem = true }
        else{ this.showElement = true }
    }
}