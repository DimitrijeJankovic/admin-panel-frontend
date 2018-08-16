import { Directive } from '@angular/core'
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi:true}]
})

export class LocationValidator implements Validator{

    validate(formGroup: FormGroup): {[key: string]: any}{
        let addressControl = formGroup.contains['address']
        let cityControl = formGroup.contains['city']
        let contryControl = formGroup.contains['country']
        let onlineUrlControl = (<FormGroup>formGroup.root).contains['onlineUrl']

        if((addressControl && addressControl.value && 
            cityControl && cityControl.value && 
            contryControl && contryControl.value) || 
            (onlineUrlControl && onlineUrlControl.value)){
                return null
            }else{
                return {validateLocation: false}
            }

    }

}