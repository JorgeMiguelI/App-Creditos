import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMov'
})
export class FilterMovPipe implements PipeTransform {

  transform(items: any, strBusqueda: string): any {
    if(items != undefined){
      return items.filter(mov => {
        return mov.fechaUltimaAct.includes(strBusqueda);
      }) ;
    }
    
  }

}
