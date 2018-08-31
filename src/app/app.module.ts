import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { AdminAuthService } from './admin/services/admin-auth.service'
import { AuthtRouteActivator } from './user/auth-route-activation.service';
import { AdminAuthtRouteActivator } from './admin/services/admin-auth-route-activation-service'
import { 
  JQ_TOKEN
} from './common/index'

declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [
    AuthtRouteActivator,
    AdminAuthtRouteActivator,
    AuthService,
    AdminAuthService,
    {
      provide: JQ_TOKEN, 
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


 