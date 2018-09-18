import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthtRouteActivator implements CanActivate{

    constructor(private auth:AuthService, private router:Router) {}

    canActivate(route:ActivatedRouteSnapshot){
        const eventExists = !!this.auth.isAuthenticated();

        if(!eventExists)
            this.router.navigate(['/404'])
        
        return eventExists
    }

}