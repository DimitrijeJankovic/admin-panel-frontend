import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload';
import {
    MatButtonModule, 
    MatSelectModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatExpansionModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule
} from '@angular/material';

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

import { OrdersComponent } from './orders/orders.component';

// services
import { ProducersService } from './services/producers.service'
import { MaterialsService } from './services/materials.service'
import { OrdersService } from  './services/orders.service'
import { SidebarService } from './services/sidebar.service'
import { OrderItemsService } from './services/order-items.service'
import { OrderItemElementsService } from './services/order-item-elements.service'

import { SearchPipe } from './orders/search.pipe'


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
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
        SearchPipe
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