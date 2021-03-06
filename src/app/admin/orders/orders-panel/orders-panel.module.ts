import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload';
import { MatButtonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { adminPanelRoutes } from './orders-panel.routes'

// components
import { OrdersPanelComponent } from './orders-panel.component'
import { OrderComponent } from './order/order.component'
import { NewOrderComponent } from './order/new-order/new-order.component'
import { OrderImageComponent } from './order/order-image/order-image.component'
import { IitemComponent } from './item/item.component'
import { NewItemComponent } from './item/new-item/new-item.component'
import { ElementComponent } from  './element/element.component'
import { NewElementComponent } from './element/new-element/new-element.component'


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminPanelRoutes),
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        OrdersPanelComponent,
        OrderComponent,
        NewOrderComponent,
        OrderImageComponent,
        IitemComponent,
        NewItemComponent,
        ElementComponent,
        NewElementComponent
    ],
    providers: [ 
    ]
})

export class OrdersPanelModule { }