import { AdminComponent } from './admin.component'
import { AdminAuthtRouteActivator } from './services/admin-auth-route-activation-service'
import { AdminLoginComponent } from './login/admin-login.component'

import { ProducersComponent } from './producers/producers.component'
import { NewProducersComponent } from './producers/new-producers/new-producers.component'
import { EditProducersComponent } from './producers/edit-producers/edit-producers.component'

import { MaterialsComponent } from './materials/materials.component'
import { NewMaterialsComponent } from './materials/new-materials/new-materials.component'
import { EditMaterialsComponent } from './materials/edit-materials/edit-materials.component'

import { OrdersComponent } from './orders/orders.component'
import { OrdersPanelModule } from './orders/orders-panel/orders-panel.module'


export const adminRoutes = [
    { path: '', component: AdminComponent,children: [        
        { path: 'producers', component: ProducersComponent },
        { path: 'producers/new', component: NewProducersComponent },
        { path: 'producers/edit/:id', component: EditProducersComponent },
        { path: 'materials', component: MaterialsComponent },
        { path: 'materials/new', component: NewMaterialsComponent },
        { path: 'materials/edit/:id', component: EditMaterialsComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'orders/panel', loadChildren: () => OrdersPanelModule },
    ], canActivate: [AdminAuthtRouteActivator]},
    
    { path: 'login', component: AdminLoginComponent}
    
]