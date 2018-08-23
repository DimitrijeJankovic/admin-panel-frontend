import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { AdminAuthService } from '../admin/services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAdminRoot: boolean = false

  constructor(
    private auth:AuthService,
    private adminAuth: AdminAuthService, 
    private router: Router,
  ) {}

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminToken');
		this.router.navigate(['/']);
  }

}
