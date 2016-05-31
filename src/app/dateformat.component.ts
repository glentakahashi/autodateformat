import {Component} from 'angular2/core';
import {DateTime} from './datetime';
import {Segment} from './segment';
import {DaySegmentType, MonthSegmentType, TextMonthSegmentType, FillSegmentType, SegmentType} from './segment-type';
import {DateFormat} from './dateformats/dateformat';
import {CoreutilsDateFormat} from './dateformats/coreutils';
import {JavaSDFDateFormat} from './dateformats/javasdf';

@Component({
    inputs: ['datetime'],
    selector: 'dateformat',
    template: `
      <template [ngIf]="datetime">
        <div *ngFor="#warning of getWarnings(datetime)">
          {{warning}}
        </div>
        <select class="" [(ngModel)]="selectedDateFormatIndex">
          <label>Date Format: </label>
          <option *ngFor="#dateFormat of DATE_FORMATS; #i = index" [value]="i">
            {{dateFormat.label}}
          </option>
        </select>
        <div *ngIf="selectedDateFormatIndex !== undefined">
          <div>
            {{DATE_FORMATS[selectedDateFormatIndex].label}}:
            <span *ngFor="#dateFormatSegment of getDateFormat(datetime).getSegments()" [class]="dateFormatSegment.getStatusClass()" title="{{dateFormatSegment.tooltip}}">{{dateFormatSegment.value}}</span>
          </div>
          <div>Parse Example: {{getDateFormat(datetime).getParseExample()}}</div>
          <div>Print Example: {{getDateFormat(datetime).getPrintExample()}}</div>
        </div>
      </template>
    `,
})
export class DateFormatComponent {
  private DATE_FORMATS: typeof DateFormat[] = [
     JavaSDFDateFormat, CoreutilsDateFormat
  ];

  private selectedDateFormatIndex = 0;

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
    if ((foundTypes.indexOf(MonthSegmentType) > -1 || foundTypes.indexOf(TextMonthSegmentType) > -1) && foundTypes.indexOf(DaySegmentType) === -1) {
      warnings.push("A month segment was found but no day segment was found");
    } else if (foundTypes.indexOf(DaySegmentType) > -1 && (foundTypes.indexOf(MonthSegmentType) === -1 && foundTypes.indexOf(TextMonthSegmentType) === -1)) {
      warnings.push("A day segment was found but no month segment was found");
    }
    return warnings;
  }

  public getDateFormat(datetime: DateTime): DateFormat {
    let o = Object.create(this.DATE_FORMATS[this.selectedDateFormatIndex].prototype);
    o.constructor.apply(o, new Array(datetime));
    return o;
  }
}
