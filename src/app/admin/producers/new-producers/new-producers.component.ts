import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { ProducersService } from '../../services/producers.service'

@Component({
    templateUrl: './new-producers.component.html',
    styleUrls: ['./new-producers.component.css']
})

export class NewProducersComponent{

    newPoduce:boolean = false
    notCreated: boolean = false
    emptyfelds:boolean = false
    noCountries: boolean = false

    countries: any[] = []

    constructor(
        private router: Router,
        private producersService: ProducersService
    ){
        this.getCountries();
    }

    saveProducer(formValues){
        if(formValues.country == null){ 
            this.emptyfelds = true 
        }else{
            this.producersService.newProducers(formValues.name ,formValues.address, formValues.secAddress,
                    formValues.city, formValues.state, formValues.country, formValues.email, 
                    formValues.phone, formValues.web,).subscribe((data: any) => {
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