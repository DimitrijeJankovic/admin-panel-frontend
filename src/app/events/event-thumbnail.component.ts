import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'event-thumbnail',
    template: `
    <div class="well thumbnail" [routerLink]="['/events', event.id]">
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date: {{event?.date | date:'shortDate'}}</div>
        <div [ngClass]="getStartTimeClass()">Time: {{event?.time}}</div>
        <div>Price: {{event?.price | currency:'USD'}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span calss="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
    </div>
    `,
    styles: [`
        .green { color: #003300 !important; }
        .bold { font-weight: bold; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
    `]
})

export class EventThumbnailComponent {
    @Input() event:IEvent;

    @Output() eventClick = new EventEmitter();

    getStartTimeClass(){
        if(this.event && this.event.time === '8:00 am')
            return ['green', 'bold']

        return []
        
    }

}