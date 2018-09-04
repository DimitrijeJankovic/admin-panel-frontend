import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService, IOrder } from '../services/orders.service';
import { SidebarService } from '../services/sidebar.service'

@Component({
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent{
    
    ordersList: IOrder
    uploadMaterialId :number

    constructor(private ordersService: OrdersService,
                private route: ActivatedRoute,
                private router: Router,
                private sideBar: SidebarService) {} 

    ngOnInit() {
        this.sideBar.show()
        this.getAllOrders()
    }

    getAllOrders(){
        this.ordersService.getAllOrders().subscribe((prod: any) => {
            this.ordersList = JSON.parse(prod._body)
        })
    }
}