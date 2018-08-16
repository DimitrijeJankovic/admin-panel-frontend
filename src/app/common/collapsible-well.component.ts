import { Component, Input } from '@angular/core'

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="collapsibleWell">
            <h4>{{title}}</h4>
            <ng-content *ngIf="visible"></ng-content>
        </div>
    `,
    styles:[`
        .collapsibleWell{
            cursor: pointer;
        }
    `]
})

export class CollapsibleWellComponent{
    @Input() title: string
    visible: boolean = true

    toggleContent(){
        this.visible = !this.visible
    }

}