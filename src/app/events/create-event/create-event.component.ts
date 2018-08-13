import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../shared/index'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  isDirty:boolean = true

  constructor(private router:Router, private eventsService:EventsService) { }

  ngOnInit() {
  }

  saveEvent(formValues){
    this.eventsService.saveEvent(formValues)
    this.isDirty = false
    this.router.navigate(['/events'])
    
  }

  cancle(){
    this.router.navigate(['/events'])
  }

}
