import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    CreateEventSessionComponent

} from './events/index';
import { Error404Component } from './errors/404.component';
import { AuthtRouteActivator } from './user/auth-route-activation.service';

export const appRoutes:Routes = [
    { path: 'user', loadChildren: () => UserModule },
    { path: '', redirectTo: '/user/login', pathMatch: 'full' },
    { path: 'events', component: EventsListComponent, resolve:{ events: EventsListResolver }, canActivate: [AuthtRouteActivator] },
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'], canActivate: [AuthtRouteActivator] },
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator, AuthtRouteActivator] },
    { path: 'events/session/new', component: CreateEventSessionComponent, canActivate: [AuthtRouteActivator] },
    { path: '404', component: Error404Component }

]