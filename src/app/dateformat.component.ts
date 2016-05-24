import {Component} from 'angular2/core';
import {DateTime} from './datetime';
import {Segment} from './segment';
import {DaySegmentType, MonthSegmentType, LongMonthSegmentType, ShortMonthSegmentType, FillSegmentType, SegmentType} from './segment-type';
import {DateFormat} from './dateformats/dateformat';
import {CoreutilsDateFormat} from './dateformats/coreutils';

@Component({
    inputs: ['datetime'],
    selector: 'dateformat',
    template: `
      <template [ngIf]="datetime">
        <div *ngFor="#warning of getWarnings(datetime)">
          {{warning}}
        </div>
        <div *ngFor="#dateFormat of getDateFormats(datetime)">
          <div>
            {{dateFormat.getLabel()}}:
            <span *ngFor="#dateFormatSegment of dateFormat.getFormat()" [class]="dateFormatSegment.getStatusClass()" title="{{dateFormatSegment.tooltip}}">{{dateFormatSegment.value}}</span>
          </div>
          <div>Print Example: {{dateFormat.getPrintExample()}}</div>
          <div>Parse Example: {{dateFormat.getParseExample()}}</div>
        </div>
      </template>
    `,
})
export class DateFormatComponent {
  private DATE_FORMATS: typeof DateFormat[] = [
     CoreutilsDateFormat,
  ];

  public getWarnings(datetime: DateTime): string[] {
    let warnings: string[] = [];
    let segments: Segment[] = datetime.getSegments();
    let segmentType: typeof SegmentType;
    let foundTypes: typeof SegmentType[] = [];
    let foundDuplicates: typeof SegmentType[] = [];
    // Find duplicate segmentTypes and warn about it
    for (let i = 0; i < segments.length; i++) {
      segmentType = segments[i].getSelectedType();
      if (segmentType === null) {
        continue;
      }
      if (foundTypes.indexOf(segmentType) > -1 && foundDuplicates.indexOf(segmentType) === -1 && segmentType !== FillSegmentType) {
        warnings.push("Multiple segmentTypes of " + segmentType.label + " found.");
        foundDuplicates.push(segmentType);
      } else {
        foundTypes.push(segmentType);
      }
    }
    // If you have month but no day, or vice versa
    if ((foundTypes.indexOf(MonthSegmentType) > -1 || foundTypes.indexOf(LongMonthSegmentType) > -1 || foundTypes.indexOf(ShortMonthSegmentType) > -1) && foundTypes.indexOf(DaySegmentType) === -1) {
      warnings.push("A month segment was found but no day segment was found");
    } else if (foundTypes.indexOf(DaySegmentType) > -1 && (foundTypes.indexOf(MonthSegmentType) === -1 && foundTypes.indexOf(LongMonthSegmentType) === -1 && foundTypes.indexOf(ShortMonthSegmentType) === -1)) {
      warnings.push("A day segment was found but no month segment was found");
    }
    return warnings;
  }

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
