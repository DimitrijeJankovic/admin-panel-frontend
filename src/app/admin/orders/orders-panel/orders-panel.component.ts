import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service'
import { OrdersService, IOrder } from '../../services/orders.service'

@Component({
    templateUrl: './orders-panel.component.html',
    styleUrls: ['./orders-panel.component.css']
})

export class OrdersPanelComponent implements OnInit{

    ordersList: any

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

    newOrder(){ 
        if(this.ordersList.length == 0){
            var order = { "order_id": 'New' }
            this.ordersList.push(order)
            this.router.navigate(['/admin/orders/panel/order/new'])
            
        }else{
            var last = this.ordersList[this.ordersList.length - 1]
            var order = { "order_id": 'New' }

            if(last.order_id != order.order_id){
                this.ordersList.push(order)
                this.router.navigate(['/admin/orders/panel/order/new'])
            }
        }
    }

    newOrderItem(id: number, orderID: number){
        var items = this.ordersList[id].order_items
        var item = { "id": 'new' }

        if(items.length != 0){
            var lastItem = items[items.length - 1]

            if(lastItem.id != item.id){
                items.push(item)
                this.router.navigate(['/admin/orders/panel/item/new'], { queryParams: { oID: orderID } })
            }
        }else{
            items.push(item)
            this.router.navigate(['/admin/orders/panel/item/new'], { queryParams: { oID: orderID } })
        }
    }

    cancel(){
        this.router.navigate(['/admin/orders'])
    }
}