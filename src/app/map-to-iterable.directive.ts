import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterable implements PipeTransform {
  public transform(dict: Object): Array<any> {
    let a = [];
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}
