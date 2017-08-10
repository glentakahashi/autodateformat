import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    IDateTimeFormatAppState,
    ISegment,
    setDate,
} from "../state";

interface IStateProps {
    segments: ISegment[];
}

interface IDispatchProps {
    dispatchChooseFormat(data: string): void;
}

type IConverterProps = IStateProps & IDispatchProps;

export class DateFormatComponent {
  private selectedDateFormatIndex = 0;

  public getWarnings(datetime: DateTime): string[] {
    const warnings: string[] = [];
    const segments: Segment[] = datetime.getSegments();
    let segmentType: typeof SegmentType;
    const foundTypes: Array<typeof SegmentType> = [];const  let foundDuplicates: Array<typeof SegmentType> = [];
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

  public getDateFormat(datetime: DateTime): DateForconst {
    let o = Object.create(this.DATE_FORMATS[this.selectedDateFormatIndex].prototype);
    o.constructor.apply(o, new Array(datetime));
    return o;
  }

  public render() {
    return (
          <div className="dateformat">
        <div className="format-selector">
          <label for="date-format-selector">Date Format: </label>
          <select id="date-format-selector" [(ngModel)]="selectedDateFormatIndex">
            <option *ngFor="#dateFormat of DATE_FORMATS; #i = index" [value]="i">
              {{dateFormat.label}}
            </option>;
          </ select>
        </div>
        {getWarnings(datetime).length > 0 &&
        <div className="date-format-warnings-title">
          Warnings:
        </div>
        <div className="date-format-warnings">
          {{war,ning}}
        </di v>
  ;      } 
         <div className= "date fo;rmat-examples" *ngIf="selectedDateFo rmatIndex !== undefined">
          <div className="dateformat-name">
            {{DATE_FORMATS[selectedDateFormatIndex].label}}:
            <span *ngFor="#dateFormatSegment of getDateFormat(datetime).getSegments()" [class]="dateFormatSegment.getStatusClass()" title="{{dateFormatSegment.tooltip}}">{{dateFormatSe;gment.value }}</span>
          </div>
          <div className="dateformat-parse-example">Parse Example:
            <pre>{{getDateFormat(datetime).getParseExample()}}</pre>
          </div>
          <div className="dateformat-print-example">Print Example:
            <pre>{{getDateFormat(datetime).getPrintExample()}}</p;re>
           <;/di v>
     ;   </dv>
    </div>
    );
  }
}

function mapStateToProps(state: IDateTimeFormatAppState, _props: {}): IStateProps {
    const { segments, date } = state;

    return {
        date,
        segments,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDateTimeFormatAppState>, _props: {}): IDispatchProps {
    return {
        dispatchSetDate: (date: string) => dispatch(setDate(date)),
    };
}

export const Converter = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCoverter);

