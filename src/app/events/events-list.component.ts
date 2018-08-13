import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from './shared/events.service';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'events-list',
    template: `
    <div class="events">
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">   
            <div *ngFor="let event of events" class="eventThumbnail col-md-5">
                <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .eventThumbnail{padding-bottom: 28px;}
        .events{ padding-top: 40px; padding-left: 30px; padding-right: 30px; }
    `]
})

export class EventsListComponent implements OnInit {

    events:IEvent[];

    constructor(private eventsService:EventsService, private route:ActivatedRoute){}

    ngOnInit(){
        this.events = this.route.snapshot.data['events']
    }

    
 
}