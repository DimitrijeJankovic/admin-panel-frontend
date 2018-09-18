import { Component, Input } from '@angular/core'

@Component({
    selector: 'collapsible-wall',
    templateUrl: './collapsible-wall.component.html',
    styleUrls: ['./collapsible-wall.component.css']
})

export class CollapsibleWallComponent{
    @Input() order_items_elements:any

    visible: boolean = false
    visibleTabel2: boolean = false

    constructor(){
    }

    toggleContent(){
        this.visible = !this.visible

        if(this.visibleTabel2 == true){
            this.visibleTabel2 = false
        }
    }

    toggleTable2(){
        this.visibleTabel2 = !this.visibleTabel2
    }
}