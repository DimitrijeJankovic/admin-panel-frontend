import { Router, ActivatedRouteSnapshot, CanActivate} from '@angular/router'
import { Injectable } from '@angular/core'
import { AdminAuthService } from './admin-auth.service'

@Injectable()
export class AdminAuthtRouteActivator implements CanActivate{

    constructor(private auth:AdminAuthService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot){
        const eventExists = !!this.auth.isAdminAuthenticated();

        if(!eventExists)
            this.router.navigate(['/404'])
        
        return eventExists
    }


}