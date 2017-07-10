import {DateTime} from '../datetime';
import {DateFormatSegment} from './dateformat-segment';
import {Segment} from '../segment';
import {
  CaseStyle, SecondFractionType, TimezoneType, SegmentType,
  DayOfWeekSegmentType, TextMonthSegmentType, DaySegmentType,
  MonthSegmentType, YearSegmentType, YearMonthDaySegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
  HourMinuteSegmentType, HourMinuteSecondSegmentType, HourSegmentType,
  MinuteSegmentType, SecondSegmentType, SecondFractionSegmentType,
  AMPMSegmentType, TimezoneSegmentType, EpochSegmentType, FillSegmentType,
} from '../segment-type';

class UnhandledSegmentTypeError extends Error {
  constructor(segmentType: typeof SegmentType) {
    super("Unhandled segmentType of type: " + segmentType.id);
  }
}

export abstract class DateFormat {
  protected static label: string;

  protected datetime: DateTime;

  constructor(datetime: DateTime) {
    this.datetime = datetime;
  }

  public getSegments(): DateFormatSegment[] {
    let format: DateFormatSegment[] = [];
    let segments: Segment[] = this.datetime.getSegments();
    let segmentType;
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];
      switch (segment.getSelectedType()) {
        case DayOfWeekSegmentType:
          segmentType = segment.getSelected() as DayOfWeekSegmentType;
          format.push(this.getDayOfWeekFormat(segmentType.getCaseStyle(), segmentType.isAbbreviated()));
          break;
        case TextMonthSegmentType:
          segmentType = segment.getSelected() as TextMonthSegmentType;
          format.push(this.getTextMonthFormat(segmentType.getCaseStyle(), segmentType.isAbbreviated()));
          break;
        case DaySegmentType:
          segmentType = segment.getSelected() as DaySegmentType;
          format.push(this.getDayFormat(segmentType.getCaseStyle(), segmentType.isPrettyEnding(), segmentType.isZeroPadded()));
          break;
        case MonthSegmentType:
          segmentType = segment.getSelected() as MonthSegmentType;
          format.push(this.getMonthFormat(segmentType.isZeroPadded()));
          break;
        case YearSegmentType:
          segmentType = segment.getSelected() as YearSegmentType;
          format.push(this.getYearFormat(segmentType.isZeroPadded(), segmentType.isTwoDigit()));
          break;
        case YearMonthDaySegmentType:
          format.push(this.getYearMonthDayFormat());
          break;
        case YearMonthDayHourMinuteSegmentType:
          format.push(this.getYearMonthDayHourMinuteFormat());
          break;
        case YearMonthDayHourMinuteSecondSegmentType:
          format.push(this.getYearMonthDayHourMinuteSecondFormat());
          break;
        case HourMinuteSegmentType:
          format.push(this.getHourMinuteFormat());
          break;
        case HourMinuteSecondSegmentType:
          format.push(this.getHourMinuteSecondFormat());
          break;
        case HourSegmentType:
          segmentType = segment.getSelected() as HourSegmentType;
          format.push(this.getHourFormat(segmentType.getTwentyFour(), segmentType.isZeroPadded()));
          break;
        case MinuteSegmentType:
          segmentType = segment.getSelected() as MinuteSegmentType;
          format.push(this.getMinuteFormat(segmentType.isZeroPadded()));
          break;
        case SecondSegmentType:
          segmentType = segment.getSelected() as SecondSegmentType;
          format.push(this.getSecondFormat(segmentType.isZeroPadded()));
          break;
        case SecondFractionSegmentType:
          segmentType = segment.getSelected() as SecondFractionSegmentType;
          format.push(this.getSecondFractionFormat(segmentType.getPrecision()));
          break;
        case AMPMSegmentType:
          segmentType = segment.getSelected() as AMPMSegmentType;
          format.push(this.getAMPMFormat(segmentType.getCaseStyle(), segmentType.isAbbreviated(), segmentType.isPeriods()));
          break;
        case TimezoneSegmentType:
          segmentType = segment.getSelected() as TimezoneSegmentType;
          switch (segmentType.getTimezoneType()) {
            case TimezoneType.Hour:
              format.push(this.getTimezoneHourFormat());
              break;
            case TimezoneType.HourMinute:
              format.push(this.getTimezoneHourMinuteFormat());
              break;
            case TimezoneType.HourMinuteSeparated:
              format.push(this.getTimezoneHourMinuteSeparatedFormat());
              break;
            case TimezoneType.Short:
              format.push(this.getTimezoneHourMinuteSeparatedFormat());
              break;
            case TimezoneType.HourMinuteSeparated:
              format.push(this.getTimezoneHourMinuteSeparatedFormat());
              break;
            default:
              throw new UnhandledSegmentTypeError(segmentType);
          }
          break;
        case EpochSegmentType:
          segmentType = segment.getSelected() as EpochSegmentType;
          format.push(this.getEpochFormat(segmentType.getMilliseconds()));
          break;
        case FillSegmentType:
          segmentType = segment.getSelected() as FillSegmentType;
          format.push(this.getFillFormat(segmentType.getToken()));
          break;
        default:
          throw new UnhandledSegmentTypeError(segment.getSelectedType());
      }
    }
    return format;
  }

  public getFormatString(): string {
    let segments = this.getSegments();
    let formatString = "";
    for (let i = 0; i < segments.length; i++) {
      formatString += segments[i].getValue();
    }
    return formatString;
  }

  public abstract getDayOfWeekFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment;
  public abstract getTextMonthFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment;
  public abstract getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment;
  public abstract getMonthFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getYearFormat(zeroPadded: boolean, twoDigit: boolean): DateFormatSegment;
  public abstract getYearMonthDayFormat(): DateFormatSegment;
  public abstract getYearMonthDayHourMinuteFormat(): DateFormatSegment;
  public abstract getYearMonthDayHourMinuteSecondFormat(): DateFormatSegment;
  public abstract getHourMinuteFormat(): DateFormatSegment;
  public abstract getHourMinuteSecondFormat(): DateFormatSegment;
  public abstract getHourFormat(twentyFourHour: boolean, zeroPadded: boolean): DateFormatSegment;
  public abstract getMinuteFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getSecondFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getSecondFractionFormat(secondFractionType: SecondFractionType): DateFormatSegment;
  public abstract getAMPMFormat(caseStyle: CaseStyle, abbreviated: boolean, periods: boolean): DateFormatSegment;
  public abstract getTimezoneHourFormat(): DateFormatSegment;
  public abstract getTimezoneHourMinuteFormat(): DateFormatSegment;
  public abstract getTimezoneHourMinuteSeparatedFormat(): DateFormatSegment;
  public abstract getTimezoneShortFormat(): DateFormatSegment;
  public abstract getTimezoneLongFormat(): DateFormatSegment;
  public abstract getEpochFormat(milliseconds: boolean): DateFormatSegment;
  public abstract getFillFormat(token: string): DateFormatSegment;

  public abstract getPrintExample(): string;
  // TODO: what if it doesn't have parsing?? (like bash) Should just return "Cannot parse specific formats?"
  public abstract getParseExample(): string;
}
