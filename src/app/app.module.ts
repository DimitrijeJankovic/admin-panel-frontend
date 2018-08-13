import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventsService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventsListResolver,
  CreateEventSessionComponent,
  SessionListComponent,
  DurationPipe
} from './events/index'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { AuthtRouteActivator } from './user/auth-route-activation.service';
import { 
  CollapsibleWellComponent, 
  JQ_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index'

declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateEventSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    EventsService,
    EventRouteActivator,
    AuthtRouteActivator,
    EventsListResolver,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: ckeckDirtyState
    },
    {
      provide: JQ_TOKEN, 
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function ckeckDirtyState(component: CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not save event, do you relly wont to cancel?')
  return true
}
 