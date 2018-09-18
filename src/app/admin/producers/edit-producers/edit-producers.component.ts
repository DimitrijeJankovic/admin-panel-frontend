import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ProducersService } from '../../services/producers.service'

@Component({
    templateUrl: './edit-producers.component.html',
    styleUrls: ['./edit-producers.component.css']
})

export class EditProducersComponent implements OnInit{

    newPoduce:boolean = false
    notCreated: boolean = false
    problem: boolean = false
    emptyfelds:boolean = false
    noCountries: boolean = false

    countries: any[] = []
    producer = {}
    producerId = null;

    constructor(
        private router: Router,
        private route : ActivatedRoute,
        private producersService: ProducersService
    ){
        this.producerId = +this.route.snapshot.paramMap.get('id')
        this.getCountries()
    }

    ngOnInit(){
        this.producersService.getProducer(this.producerId).subscribe((data: any) => {
            if(!data){
                this.problem = true
            }else{
                this.producer = JSON.parse(data._body)
                this.producer = this.producer[0]         
            }
        },(error) => {
            this.problem = true
        })
    }

    saveProducer(formValues){
        if(formValues.country == null){ 
            this.emptyfelds = true 
        }else{
            this.producersService.editProducers(formValues.name ,formValues.address, formValues.secAddress,
                    formValues.city, formValues.state, formValues.country, formValues.email, 
                    formValues.phone, formValues.web, this.producerId).subscribe((data: any) => {
                if(!data){
                  this.notCreated = true
                }else{
                  this.router.navigate(['/admin/producers'])
                }
              },(error) => {
                this.notCreated = true
              })
        }
    }


    getCountries(){
        this.producersService.getAllCountries().subscribe((data: any) => {
            if(!data){
                this.noCountries = true
            }else{
                this.countries = JSON.parse(data._body)
            }
        },(error) => {
            this.noCountries = true
        })
    }

    cancel(){
        this.router.navigate(['/admin/producers'])
    }
}