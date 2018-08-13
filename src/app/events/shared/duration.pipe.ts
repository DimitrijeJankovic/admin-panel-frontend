import { Pipe, PipeTransform } from '@angular/core'
import { pipe } from 'rxjs';

@Pipe({
    name: 'durations'
})

export class DurationPipe implements PipeTransform{
    transform(value: number): string{
        switch(value){
            case 1: return "Half Hour"
            case 2: return "One Hour"
            case 3: return "Hald Day"
            case 4: return "Full Day"
            default: return value.toString()
        }
    }
}