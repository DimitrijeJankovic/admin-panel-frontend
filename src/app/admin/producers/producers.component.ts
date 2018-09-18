import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducersService, IProducers } from '../services/producers.service';

@Component({
    selector: 'producers',
    templateUrl: './producers.component.html',
    styleUrls: ['./producers.component.css']
})

export class ProducersComponent implements OnInit{

    producersList:IProducers

    constructor(private producersService:ProducersService, 
                private route:ActivatedRoute){}

    ngOnInit(){
        this.getAllProduces()
    }

    getAllProduces() {
        this.producersService.getAllProducers().subscribe((prod: any) => {
            this.producersList = JSON.parse(prod._body)
        })
    }

    deleteProduce(id) {
		this.producersService.deleteProducer(id).subscribe( e => { this.getAllProduces() })
	}


    
    
}