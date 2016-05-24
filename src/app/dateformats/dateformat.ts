import {DateTime} from '../datetime';
import {DateFormatSegment} from './dateformat-segment';
import {Segment} from '../segment';
import {
  CaseStyle, TimezoneOffsetType, SegmentType,
  ShortDaySegmentType, LongDaySegmentType,
  ShortMonthSegmentType, LongMonthSegmentType, DaySegmentType,
  MonthSegmentType, YearSegmentType, YearMonthDaySegmentType, ShortYearSegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
  HourMinuteSegmentType, HourMinuteSecondSegmentType, HourSegmentType,
  MinuteSegmentType, SecondSegmentType, MillisecondSegmentType,
  AMPMSegmentType, ShortTimezoneSegmentType, LongTimezoneSegmentType,
  TimezoneOffsetSegmentType, EpochSegmentType, FillSegmentType,
} from '../segment-type';

class UnhandledSegmentTypeError extends Error {
  constructor(segmentType: typeof SegmentType) {
    super("Unhandled segmentType of type: " + segmentType.id);
  }
}

export abstract class DateFormat {
  protected datetime: DateTime;

  constructor(datetime: DateTime) {
    this.datetime = datetime;
  }

  public getFormat(): DateFormatSegment[] {
    let format: DateFormatSegment[] = [];
    let segments: Segment[] = this.datetime.getSegments();
    let segmentType;
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];
      switch (segment.getSelectedType()) {
        case ShortDaySegmentType:
          segmentType = segment.getSelected() as ShortDaySegmentType;
          format.push(this.getShortDayFormat(segmentType.getCaseStyle()));
          break;
        case LongDaySegmentType:
          segmentType = segment.getSelected() as LongDaySegmentType;
          format.push(this.getLongDayFormat(segmentType.getCaseStyle()));
          break;
        case ShortMonthSegmentType:
          segmentType = segment.getSelected() as ShortMonthSegmentType;
          format.push(this.getShortMonthFormat(segmentType.getCaseStyle()));
          break;
        case LongMonthSegmentType:
          segmentType = segment.getSelected() as LongMonthSegmentType;
          format.push(this.getLongMonthFormat(segmentType.getCaseStyle()));
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
          format.push(this.getYearFormat(segmentType.isZeroPadded()));
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
        case ShortYearSegmentType:
          segmentType = segment.getSelected() as ShortYearSegmentType;
          format.push(this.getShortYearFormat(segmentType.isZeroPadded()));
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
        case MillisecondSegmentType:
          format.push(this.getMillisecondFormat());
          break;
        case AMPMSegmentType:
          segmentType = segment.getSelected() as AMPMSegmentType;
          format.push(this.getAMPMFormat(segmentType.getCaseStyle()));
          break;
        case ShortTimezoneSegmentType:
          segmentType = segment.getSelected() as ShortTimezoneSegmentType;
          format.push(this.getShortTimezoneFormat(segmentType.getCaseStyle()));
          break;
        case LongTimezoneSegmentType:
          segmentType = segment.getSelected() as LongTimezoneSegmentType;
          format.push(this.getLongTimezoneFormat(segmentType.getCaseStyle()));
          break;
        case TimezoneOffsetSegmentType:
          segmentType = segment.getSelected() as TimezoneOffsetSegmentType;
          switch (segmentType.getTimezoneOffsetType()) {
            case TimezoneOffsetType.Hour:
              format.push(this.getTimezoneOffsetHourFormat());
              break;
            case TimezoneOffsetType.HourMinute:
              format.push(this.getTimezoneOffsetHourMinuteFormat());
              break;
            case TimezoneOffsetType.HourMinuteSecond:
              format.push(this.getTimezoneOffsetHourMinuteSecondFormat());
              break;
            case TimezoneOffsetType.HourMinuteSeparated:
              format.push(this.getTimezoneOffsetHourMinuteSeparatedFormat());
              break;
            case TimezoneOffsetType.HourMinuteSecondSeparated:
              format.push(this.getTimezoneOffsetHourMinuteSecondSeparatedFormat());
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
    let format = this.getFormat();
    let formatString = "";
    for (let i = 0; i < format.length; i++) {
      formatString += format[i].getValue();
    }
    return formatString;
  }

  public abstract getShortDayFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getLongDayFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getShortMonthFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getLongMonthFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment;
  public abstract getMonthFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getYearFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getYearMonthDayFormat(): DateFormatSegment;
  public abstract getYearMonthDayHourMinuteFormat(): DateFormatSegment;
  public abstract getYearMonthDayHourMinuteSecondFormat(): DateFormatSegment;
  public abstract getShortYearFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getHourMinuteFormat(): DateFormatSegment;
  public abstract getHourMinuteSecondFormat(): DateFormatSegment;
  public abstract getHourFormat(twentyFourHour: boolean, zeroPadded: boolean): DateFormatSegment;
  public abstract getMinuteFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getSecondFormat(zeroPadded: boolean): DateFormatSegment;
  public abstract getMillisecondFormat(): DateFormatSegment;
  public abstract getAMPMFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getShortTimezoneFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getLongTimezoneFormat(caseStyle: CaseStyle): DateFormatSegment;
  public abstract getTimezoneOffsetHourFormat(): DateFormatSegment;
  public abstract getTimezoneOffsetHourMinuteFormat(): DateFormatSegment;
  public abstract getTimezoneOffsetHourMinuteSecondFormat(): DateFormatSegment;
  public abstract getTimezoneOffsetHourMinuteSeparatedFormat(): DateFormatSegment;
  public abstract getTimezoneOffsetHourMinuteSecondSeparatedFormat(): DateFormatSegment;
  public abstract getEpochFormat(milliseconds: boolean): DateFormatSegment;
  public abstract getFillFormat(token: string): DateFormatSegment;

  public abstract getPrintExample(): string;
  // TODO: what if it doesn't have parsing?? (like bash) Should just return "Cannot parse specific formats?"
  public abstract getParseExample(): string;
  public abstract getLabel(): string;
}
