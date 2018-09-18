import { Component } from '@angular/core'
import { SidebarService } from '../services/sidebar.service'

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent{

    constructor( private sideBar: SidebarService ){}

}