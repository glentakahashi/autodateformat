import {DateFormat} from './dateformat';
import {DateFormatSegment, DateFormatSegmentStatus} from './dateformat-segment';
import {CaseStyle, SecondFractionType} from '../segment-type';

export class JavaSDFDateFormat extends DateFormat {
  protected static label = "Java SimpleDateFormat";

  public getDayOfWeekFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "EEE");
    } else {
      return this.getCasedSegmentType(caseStyle, "EEEE");
    }
  }

  public getTextMonthFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "MMM");
    } else {
      return this.getCasedSegmentType(caseStyle, "MMMM");
    }
  }

  public getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment {
    let tooltip = null;
    let stat = DateFormatSegmentStatus.OKAY;
    if (prettyEnding) {
      tooltip = "Java SimpleDateFormat does not support st, nd, rd, th natively.";
      stat = DateFormatSegmentStatus.WARN;
    }
    if (zeroPadded) {
      return new DateFormatSegment("dd", stat, tooltip);
    } else {
      return new DateFormatSegment("d", stat, tooltip);
    }
  }

  public getMonthFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("MM", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("M", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getYearFormat(zeroPadded: boolean, twoDigit: boolean): DateFormatSegment {
    let format = "";
    if (zeroPadded) {
      format += "y";
    }
    if (!twoDigit) {
      format += "yy";
    }
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayFormat(): DateFormatSegment {
    return new DateFormatSegment("yyyyMMdd", DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("yyyyMMddHHmm", DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteSecondFormat(): DateFormatSegment {
    return new DateFormatSegment("yyyyMMddHHmmss", DateFormatSegmentStatus.OKAY, null);
  }

  public getHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("HHmm", DateFormatSegmentStatus.OKAY, null);
  }

  public getHourMinuteSecondFormat(): DateFormatSegment {
    return new DateFormatSegment("HHmmss", DateFormatSegmentStatus.OKAY, null);
  }

  public getHourFormat(twentyFourHour: boolean, zeroPadded: boolean): DateFormatSegment {
    if (twentyFourHour) {
      if (zeroPadded) {
        return new DateFormatSegment("HH", DateFormatSegmentStatus.OKAY, null);
      } else {
        return new DateFormatSegment("H", DateFormatSegmentStatus.OKAY, null);
      }
    } else {
      if (zeroPadded) {
        return new DateFormatSegment("hh", DateFormatSegmentStatus.OKAY, null);
      } else {
        return new DateFormatSegment("h", DateFormatSegmentStatus.OKAY, null);
      }
    }
  }

  public getMinuteFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("mm", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("m", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getSecondFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("ss", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("s", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getSecondFractionFormat(secondFractionType: SecondFractionType): DateFormatSegment {
    if (secondFractionType !== SecondFractionType.Milliseconds) {
      return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, JavaSDFDateFormat.label + " can only parse milliseconds.");
    }
    return new DateFormatSegment("SSS", DateFormatSegmentStatus.WARN, "Milliseconds must always be 3 digits, otherwise it will not parse correctly. To parse 1 or two digits, use that many S's");
  }

  public getAMPMFormat(caseStyle: CaseStyle): DateFormatSegment {
    switch (caseStyle) {
      case CaseStyle.Upper:
        return new DateFormatSegment("a", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Lower:
        return new DateFormatSegment("a", DateFormatSegmentStatus.WARN, "Java only outputs Uppercase AMPM");
      case CaseStyle.Title:
        return new DateFormatSegment("a", DateFormatSegmentStatus.WARN, "Java only outputs Uppercase AMPM");
    }
  }

  public getTimezoneHourFormat(): DateFormatSegment {
    return new DateFormatSegment("X", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("XX", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneHourMinuteSeparatedFormat(): DateFormatSegment {
    return new DateFormatSegment("XXX", DateFormatSegmentStatus.OKAY, null);
  }

  // TODO: I think this is wrong
  public getTimezoneShortFormat(): DateFormatSegment {
    return new DateFormatSegment("zzz", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneLongFormat(): DateFormatSegment {
    return new DateFormatSegment("zzzz", DateFormatSegmentStatus.OKAY, null);
  }

  public getEpochFormat(milliseconds: boolean): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "Java SimpleDateFormat cannot parse directly from epoch.");
  }

  public getFillFormat(token: string): DateFormatSegment {
    let containsAlphaRegex = /.*[a-zA-Z].*/;
    let str: string = token.replace("'", "''");
    if (containsAlphaRegex.test(str)) {
      str = "'" + str + "'";
    }
    return new DateFormatSegment(str, DateFormatSegmentStatus.OKAY, null);
  }

  // TODO: what if it doesn't have parsing?? (like this one) Probably, just return null and show an info
  public getParseExample(): string {
    return "Date myParsedDate = new SimpleDateFormat(\"" + this.getFormatString() + "\").parse(\"" + this.datetime.toString() + "\");";
  }

  public getPrintExample(): string {
    return "System.out.println(new SimpleDateFormat(\"" + this.getFormatString() + "\").format(myParsedDate));";
  }

  private getCasedSegmentType(caseStyle: CaseStyle, formatString: string): DateFormatSegment {
    let stat = DateFormatSegmentStatus.OKAY;
    let tooltip = null;
    if (caseStyle !== CaseStyle.Title) {
        stat = DateFormatSegmentStatus.WARN;
        tooltip = "Java SimpleDateFormat only directly supports title format. Upper/Lowercasing should be done via functions afterwards.";
    }
    return new DateFormatSegment(formatString, stat, tooltip);
  }
}
