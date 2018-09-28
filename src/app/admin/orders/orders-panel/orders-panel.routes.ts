import { OrdersPanelComponent } from './orders-panel.component'
import { OrderComponent } from './order/order.component'
import { NewOrderComponent } from './order/new-order/new-order.component'
import { IitemComponent } from './item/item.component'
import { NewItemComponent } from './item/new-item/new-item.component'
import { ElementComponent } from './element/element.component'


export const adminPanelRoutes = [
    { path: '', component: OrdersPanelComponent,children: [
        { path: 'order/new', component: NewOrderComponent },
        { path: 'order/:id', component: OrderComponent },
        { path: 'item/new', component: NewItemComponent },
        { path: 'item/:id', component: IitemComponent },
        { path: 'element/:id', component: ElementComponent }        
    ]}
] 