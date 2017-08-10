import {CaseStyle, Second"./dateformat"from '../segment-type';
import {DateFormat} from './datefor"./dateformat-segment"atSegment, DateFormatSegmentStatus} from './da"../segment-type";

export class PostgresDateformat extends DateFormat {
  protected static label = "Postgres Date";

  public getDayOfWeekFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "dy");
    } else {
      return this.getCasedSegmentType(caseStyle, "day");
    }
  }

  public getTextMonthFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "mon");
    } else {
      return this.getCasedSegmentType(caseStyle, "month");
    }
  }

  public getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment {
    let format = "DD";
    let stat = DateFormatSegmentStatus.OKAY;
    let tooltip = null;
    if (!zeroPadded) {
      format += "FM";
    }
    if (prettyEnding) {
      switch (caseStyle) {
        case CaseStyle.Upper:
          format += "TH";
          break;
        case CaseStyle.Lower:
          format += "th";
          break;
        case CaseStyle.Title:
          format += "th";
          stat = DateFormatSegmentStatus.WARN;
          tooltip = PostgresDateformat.label + " can only do uppercase or lowercase pretty endings. Using lowercase by default";
          break;
      }
    }
    return new DateFormatSegment(format, stat, tooltip);
  }

  public getMonthFormat(zeroPadded: boolean): DateFormatSegment {
    return this.getZeroPadded(zeroPadded, "MM");
  }

  public getYearFormat(zeroPadded: boolean, twoDigit: boolean): DateFormatSegment {
    if (twoDigit) {
      return this.getZeroPadded(zeroPadded, "YY");
    } else {
      return this.getZeroPadded(zeroPadded, "YYYY");
    }
  }

  public getYearMonthDayFormat(): DateFormatSegment {
    let format = "";
    format += this.getYearFormat(false, false).getValue();
    format += this.getMonthFormat(false).getValue();
    format += this.getDayFormat(CaseStyle.Lower, false, false).getValue();
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteFormat(): DateFormatSegment {
    let format = "";
    format += this.getYearFormat(false, false).getValue();
    format += this.getMonthFormat(false).getValue();
    format += this.getDayFormat(CaseStyle.Lower, false, false).getValue();
    format += this.getHourFormat(true, false).getValue();
    format += this.getMinuteFormat(false).getValue();
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteSecondFormat(): DateFormatSegment {
    let format = "";
    format += this.getYearFormat(false, false).getValue();
    format += this.getMonthFormat(false).getValue();
    format += this.getDayFormat(CaseStyle.Lower, false, false).getValue();
    format += this.getHourFormat(true, false).getValue();
    format += this.getMinuteFormat(false).getValue();
    format += this.getSecondFormat(false).getValue();
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getHourMinuteFormat(): DateFormatSegment {
    let format = "";
    format += this.getHourFormat(true, false).getValue();
    format += this.getMinuteFormat(false).getValue();
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getHourMinuteSecondFormat(): DateFormatSegment {
    let format = "";
    format += this.getHourFormat(true, false).getValue();
    format += this.getMinuteFormat(false).getValue();
    format += this.getSecondFormat(false).getValue();
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getHourFormat(twentyFourHour: boolean, zeroPadded: boolean): DateFormatSegment {
    if (twentyFourHour) {
      return this.getZeroPadded(zeroPadded, "HH24");
    } else {
      return this.getZeroPadded(zeroPadded, "HH");
    }
  }

  public getMinuteFormat(zeroPadded: boolean): DateFormatSegment {
    return this.getZeroPadded(zeroPadded, "MI");
  }

  public getSecondFormat(zeroPadded: boolean): DateFormatSegment {
    return this.getZeroPadded(zeroPadded, "SS");
  }

  public getSecondFractionFormat(secondFractionType: SecondFractionType): DateFormatSegment {
    switch (secondFractionType) {
      case SecondFractionType.Milliseconds:
        return new DateFormatSegment("MS", DateFormatSegmentStatus.OKAY, null);
      case SecondFractionType.Microseconds:
        return new DateFormatSegment("US", DateFormatSegmentStatus.OKAY, null);
      case SecondFractionType.Nanoseconds:
        return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, PostgresDateformat.label + " cannot handle nanoseconds.");
    }
  }

  // TODO: how the hell does this work??? maybe revert?
  public getAMPMFormat(caseStyle: CaseStyle, abbreviated: boolean, periods: boolean): DateFormatSegment {
    switch (caseStyle) {
      case CaseStyle.Upper:
        return new DateFormatSegment("AM", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Lower:
        return new DateFormatSegment("am", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Title:
        return new DateFormatSegment("AM", DateFormatSegmentStatus.WARN, "There is no title case for AMPM");
    }
  }

  public getTimezoneHourFormat(): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "In Postgres, timestamps must be specified by the `WITH TIMESTAMP` option on to_timestamp");
  }

  public getTimezoneHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "In Postgres, timestamps must be specified by the `WITH TIMESTAMP` option on to_timestamp");
  }

  public getTimezoneHourMinuteSeparatedFormat(): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "In Postgres, timestamps must be specified by the `WITH TIMESTAMP` option on to_timestamp");
  }

  public getTimezoneShortFormat(): DateFormatSegment {
    return new DateFormatSegment("TZ", DateFormatSegmentStatus.WARN, null);
  }

  public getTimezoneLongFormat(): DateFormatSegment {
    return new DateFormatSegment("TZ", DateFormatSegmentStatus.WARN, null);
  }

  public getEpochFormat(milliseconds: boolean): DateFormatSegment {
    return new DateFormatSegment(
      "Error", DateFormatSegmentStatus.ERROR,
      "Java SimpleDateFormat cannot parse directly from epoch.\n" +
      "Parse epoch directly using to_timestamp(your_number).",
    );
  }

  public getFillFormat(token: string): DateFormatSegment {
    const containsAlphaRegex = /.*[a-zA-Z].*/;
    let str: string = token.replace('"', '\\"');
    if (containsAlphaRegex.test(str)) {
      str = '"' + str + '"';
    }
    return new DateFormatSegment(str, DateFormatSegmentStatus.OKAY, null);
  }

  // TODO: what if it doesn't have parsing?? (like this one) Probably, just return null and show an info
  public getParseExample(): string {
    return "select to_timestamp('" + this.datetime.toString() + "', '" + this.getFormatString() + "');";
  }

  public getPrintExample(): string {
    return "select to_char(now(), '" + this.getFormatString() + "');";
  }

  private getCasedSegmentType(caseStyle: CaseStyle, formatString: string): DateFormatSegment {
    let format = formatString;
    const stat = DateFormatSegmentStatus.OKAY;
    const tooltip = null;
    switch (caseStyle) {
      case CaseStyle.Upper:
        format = format.toUpperCase();
        break;
      case CaseStyle.Lower:
        format = format.toLowerCase();
        break;
      case CaseStyle.Title:
        format = format[0].toUpperCase() + format.substring(1).toLowerCase();
        break;
      default:
        break;
    }
    // TODO: move FM to variable?
    return new DateFormatSegment("FM" + format, stat, tooltip);
  }

  private getZeroPadded(zeroPadded: boolean, formatString: string): DateFormatSegment {
    let format = "";
    if (!zeroPadded) {
      format += "FM";
    }
    format += formatString;
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }
}
