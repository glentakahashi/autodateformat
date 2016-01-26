import {Component} from 'angular2/core';
import {DateTime} from './datetime';
import {DateFormat} from './dateformats/dateformat';
import {CoreutilsDateFormat} from './dateformats/coreutils';

@Component({
    inputs: ['datetime'],
    selector: 'dateformat',
    template: `
      <template [ngIf]="datetime">
        <div *ngFor="#dateFormat of getDateFormats(datetime)">
          {{dateFormat.getLabel()}}:
          <span *ngFor="#dateFormatSegment of dateFormat.getFormat()" [class]="dateFormatSegment.getStatusClass()" title="{{dateFormatSegment.tooltip}}">{{dateFormatSegment.value}}</span>
          --- {{dateFormat.getExample()}}
        </div>
      </template>
    `,
})
export class DateFormatComponent {
  private DATE_FORMATS: typeof DateFormat[] = [
     CoreutilsDateFormat,
  ];

  public getDateFormats(datetime: DateTime): DateFormat[] {
    let dateFormats: DateFormat[] = [];
    for (let i in this.DATE_FORMATS) {
      let o = Object.create(this.DATE_FORMATS[i].prototype);
      o.constructor.apply(o, new Array(datetime));
      dateFormats.push(o);
    }
    return dateFormats;
  }
}
