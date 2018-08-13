import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { ISession } from '../events';
import { EventsService } from '../events/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm: string = ""
  foundSessions: ISession[]

  constructor(
    private auth:AuthService, 
    private router :Router,
    private eventsService: EventsService
  ) {}

  ngOnInit() {}

  logout(){
    sessionStorage.removeItem('token');
		this.router.navigate(['/']);
  }

  sreachSessions(searchTerm){
    this.eventsService.sreachSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions
      console.log(this.foundSessions);
      
    })
  }

}
