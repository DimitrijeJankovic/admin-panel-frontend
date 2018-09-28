import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { Error404Component } from './errors/404.component';
import { AuthtRouteActivator } from './user/auth-route-activation.service';

export const appRoutes:Routes = [
    { path: 'user', loadChildren: () => UserModule },
    { path: 'admin', loadChildren: () => AdminModule },
    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '/404'}

]