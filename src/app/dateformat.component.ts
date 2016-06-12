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
    <div class="dateformat">
      <template [ngIf]="datetime">
        <div class="format-selector">
          <label for="date-format-selector">Date Format: </label>
          <select id="date-format-selector" [(ngModel)]="selectedDateFormatIndex">
            <option *ngFor="#dateFormat of DATE_FORMATS; #i = index" [value]="i">
              {{dateFormat.label}}
            </option>
          </select>
        </div>
        <div class="date-format-warnings-title" *ngIf="getWarnings(datetime).length > 0">
          Warnings:
        </div>
        <div class="date-format-warnings" *ngFor="#warning of getWarnings(datetime)">
          {{warning}}
        </div>
        <div class="dateformat-examples" *ngIf="selectedDateFormatIndex !== undefined">
          <div class="dateformat-name">
            {{DATE_FORMATS[selectedDateFormatIndex].label}}:
            <span *ngFor="#dateFormatSegment of getDateFormat(datetime).getSegments()" [class]="dateFormatSegment.getStatusClass()" title="{{dateFormatSegment.tooltip}}">{{dateFormatSegment.value}}</span>
          </div>
          <div class="dateformat-parse-example">Parse Example:
            <pre>{{getDateFormat(datetime).getParseExample()}}</pre>
          </div>
          <div class="dateformat-print-example">Print Example:
            <pre>{{getDateFormat(datetime).getPrintExample()}}</pre>
          </div>
        </div>
      </template>
    </div>
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
