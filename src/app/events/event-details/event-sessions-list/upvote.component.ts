import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'upvote',
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i *ngIf="voted" class="fas fa-heart"></i>
                    <i *ngIf="!voted" class="far fa-heart"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{ count }}</div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./upvote.component.css']
})

export class UpvoteComponent{
    @Input() count: number
    @Input() voted: boolean
    @Output() vote = new EventEmitter()

    onClick(){
        this.vote.emit({})
    }
}