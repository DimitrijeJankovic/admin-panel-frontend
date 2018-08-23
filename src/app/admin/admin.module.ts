import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { adminRoutes } from './admin.routes'

import { SidebarComponent } from './sidebar/sidebar.component'
import { AdminComponent } from './admin.component'
import { AdminLoginComponent } from './login/admin-login.component'

import { ProducersComponent } from './producers/producers.component'
import { NewProducersComponent } from './producers/new-producers/new-producers.component'
import { EditProducersComponent } from './producers/edit-producers/edit-producers.component'
import { ProducersService } from './services/producers.service'

import { MaterialsComponent } from './materials/materials.component'
import { OrdersComponent } from './orders/orders.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SidebarComponent,
        AdminComponent,
        AdminLoginComponent,
        ProducersComponent,
        NewProducersComponent,
        EditProducersComponent,
        MaterialsComponent,
        OrdersComponent
    ],
    providers: [
        ProducersService
    ]
})

export class AdminModule { }