import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducersService, IProducers } from '../services/producers.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'producers',
    templateUrl: './producers.component.html',
    styleUrls: ['./producers.component.css']
})

export class ProducersComponent implements OnInit{

    producersList: any[]

    displayedColumns: string[] = [
        'producers_id', 'producers_name', 'address', 
        'address1', 'city', 'state', 'country',
        'email', 'phone', 'web', 'action'
    ];

    dataSource: any

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private producersService:ProducersService, 
                private route:ActivatedRoute){}

    ngOnInit(){
        this.getAllProduces()
    }

    getAllProduces() {
        this.producersService.getAllProducers().subscribe((prod: any) => {
            this.producersList = JSON.parse(prod._body)
            this.dataSource = new MatTableDataSource<IProducers>(this.producersList)
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator
            
        })
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteProduce(id) {
		this.producersService.deleteProducer(id).subscribe( e => { this.getAllProduces() })
	}
}

 