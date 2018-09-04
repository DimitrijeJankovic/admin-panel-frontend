import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload';

import { adminRoutes } from './admin.routes'

// components
import { SidebarComponent } from './sidebar/sidebar.component'
import { AdminComponent } from './admin.component'
import { AdminLoginComponent } from './login/admin-login.component'

import { ProducersComponent } from './producers/producers.component'
import { NewProducersComponent } from './producers/new-producers/new-producers.component'
import { EditProducersComponent } from './producers/edit-producers/edit-producers.component'

import { MaterialsComponent } from './materials/materials.component'
import { NewMaterialsComponent } from './materials/new-materials/new-materials.component'
import { EditMaterialsComponent } from './materials/edit-materials/edit-materials.component'

import { OrdersComponent } from './orders/orders.component'
import { NewOrderComponent } from './orders/new-order/new-order.component'

import { CollapsibleWallComponent } from '../common/collapsible-wall/collapsible-wall.component'

// services
import { ProducersService } from './services/producers.service'
import { MaterialsService } from './services/materials.service'
import { OrdersService } from  './services/orders.service'
import { SidebarService } from './services/sidebar.service'
import { OrderItemsService } from './services/order-items.service'
import { OrderItemElementsService } from './services/order-item-elements.service'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule
    ],
    declarations: [
        SidebarComponent,
        AdminComponent,
        AdminLoginComponent,
        ProducersComponent,
        NewProducersComponent,
        EditProducersComponent,
        MaterialsComponent,
        NewMaterialsComponent,
        EditMaterialsComponent,
        OrdersComponent,
        NewOrderComponent,
        CollapsibleWallComponent
    ],
    providers: [
        ProducersService,
        MaterialsService,
        OrdersService,
        SidebarService,
        OrderItemsService,
        OrderItemElementsService
    ]
})

export class AdminModule { }