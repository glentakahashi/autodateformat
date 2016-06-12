import {Utils} from './utils';
import {Timezones} from './timezones';
import {SegmentTypeSettings} from './segment-type-settings';
import {BooleanSegmentTypeSetting, StringSegmentTypeSetting, DropdownSegmentTypeSetting} from './segment-type-setting';

// TODO: refactor getters and setters to have more consistent ids

// TODO: define a "split" verb and a "join" verb to combine two segments? It must do it automatically?
// i.e. -102034 = Timezone by default, be able to split into -, 102034.
// 102034 = hourminutesecond/epoch by default, etc. able to split at any spot you want -
// make the user do the functionality?? Maybe keep the combined words for ease of use, but allow to split
// Initial parsing only defines initial segments
// Put on the Segment class (make a single UI for splitting/joining the string, strings will be short so maybe just
// make an easy "drag a line bar" thing)

interface ZeroPaddedSegmentType {
  isZeroPadded(): boolean;
}

export abstract class SegmentType {
  public static id: string;
  public static label: string;

  protected settings: SegmentTypeSettings;
  protected valid: boolean = false;

  private enabled: boolean = true;
  private segment: string;

  constructor(token: string) {
    this.segment = token;
    this.settings = new SegmentTypeSettings();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public isValid(): boolean {
    return this.valid;
  }

  public getValue(): string {
    return this.segment;
  }

  public getSettings(): SegmentTypeSettings {
    return this.settings;
  }

  public getLabel(): string {
    return this.getStaticElement('label');
  }

  public getID(): string {
    return this.getStaticElement('id');
  }

  private getStaticElement(id: string): any {
    return this.constructor[id];
  }
}

export enum CaseStyle {
  Lower,
  Upper,
  Title,
  Unknown
}

export abstract class StringSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    let styles: { [id: number]: string } = {
      [CaseStyle.Lower]: "lower",
      [CaseStyle.Upper]: "UPPER",
      [CaseStyle.Title]: "Title",
    };
    this.settings.add(new DropdownSegmentTypeSetting("caseStyle", "Case Style", null, CaseStyle.Title, styles));
    this.setCaseStyle(token);
  }

  // XXX: Title should be default?
  public static parseCaseStyle(str: string): CaseStyle {
    if (/^[a-z]+$/.test(str)) {
      return CaseStyle.Lower;
    } else if (/^[A-Z]+$/.test(str)) {
      return CaseStyle.Upper;
    } else {
      return CaseStyle.Title;
    }
  }

  public setCaseStyle(token: string) {
    this.settings.get("caseStyle").setValue(StringSegmentType.parseCaseStyle(token));
  }

  public getCaseStyle(): number {
    return parseInt(this.settings.get("caseStyle").getValue(), 10);
  }
}

export class DayOfWeekSegmentType extends StringSegmentType {
  public static id = "DayOfWee";
  public static label = "Day Of Week";

  private static SHORT_DAYS: string[] = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];
  private static DAYS: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("abbreviated", "Abbreviated", "Abbreviate the name (i.e. Mon,Tues,Wed)", true));
    if (DayOfWeekSegmentType.SHORT_DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", true);
      this.valid = true;
    } else if (DayOfWeekSegmentType.DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", false);
      this.valid = true;
    }
  }

  public isAbbreviated(): boolean {
    return this.settings.get("abbreviated").getValue();
  }
}

export class TextMonthSegmentType extends StringSegmentType {
  public static id = "TextMonth";
  public static label = "Text Month";

  private static SHORT_MONTHS: string[] = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "sept", "oct", "nov", "dec",
  ];
  private static MONTHS: string[] = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("abbreviated", "Abbreviated", "Abbreviate the name (i.e. Mon,Tues,Wed)", true));
    if (TextMonthSegmentType.SHORT_MONTHS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", true);
      this.valid = true;
    } else if (TextMonthSegmentType.MONTHS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", false);
      this.valid = true;
    }
  }

  public isAbbreviated(): boolean {
    return this.settings.get("abbreviated").getValue();
  }
}

export class DaySegmentType extends StringSegmentType implements ZeroPaddedSegmentType {
  public static DATE_ENDINGS: string[] = ["st", "nd", "rd", "th"];

  public static id = "Day";
  public static label = "Day";

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZero", "Leading Zero", "Whether or not the day is padded with a leading zero.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "prettyEnding", "Pretty Ending", "Whether or not the day is suffixed with 'st', 'nd', 'rd' and 'th'.", false
    ));
    let ending: string;
    if (token.length === 3) {
      ending = token.substring(1, 3);
      token = token[0];
    } else if (token.length === 4) {
      ending = token.substring(2, 4);
      token = token.substring(0, 2);
    }
    if (ending) {
      this.setCaseStyle(ending);
    }
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 31) {
      if (token.length === 1) {
        this.settings.setValue("leadingZero", false);
      }
      this.valid = true;
    }
    if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) !== -1) {
      this.settings.setValue("prettyEnding", true);
    } else if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) === -1) {
      this.valid = false;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }

  public isPrettyEnding(): boolean {
    return this.settings.get("prettyEnding").getValue();
  }
}

export class MonthSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Month";
  public static label = "Month";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZero", "Leading Zero", "Whether or not the month is padded with a leading zero.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 12) {
      if (token.length === 1) {
        this.settings.setValue("leadingZero", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }
}

// For the sake of usability, this assumes dates after 1970.
export class YearSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Year";
  public static label = "Year";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "twoDigit", "Two Digit", "Abbreviate the year to the last two digits.", false
    ));
    if ((token.length === 4 || token.length === 2) && Utils.isNumber(token)) {
      if (token.length === 2) {
        this.settings.setValue("twoDigit", true);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }

  public isTwoDigit(): boolean {
    return this.settings.get("twoDigit").getValue();
  }
}

// Should always be 24hour
export class HourMinuteSegmentType extends SegmentType {
  public static id = "HourMinute";
  public static label = "Hour and Minute";
  constructor(token: string) {
    super(token);
    if (token.length === 4 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

// Should always be 24hour
export class HourMinuteSecondSegmentType extends SegmentType {
  public static id = "HourMinuteSecond";
  public static label = "Hour, Minute and Second";
  constructor(token: string) {
    super(token);
    if (token.length === 6 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDaySegmentType extends SegmentType {
  public static id = "YearMonthDay";
  public static label = "Year, Month and Day";
  constructor(token: string) {
    super(token);
    if (token.length === 8 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDayHourMinuteSegmentType extends SegmentType {
  public static id = "YearMonthDayHourMinute";
  public static label = "Year, Month, Day, Hour and Minute";
  constructor(token: string) {
    super(token);
    if (token.length === 12 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDayHourMinuteSecondSegmentType extends SegmentType {
  public static id = "YearMonthDayHourMinuteSecond";
  public static label = "Year, Month, Day, Hour, Minute and Second";
  constructor(token: string) {
    super(token);
    if (token.length === 14 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class HourSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Hour";
  public static label = "Hour";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "twentyFour", "24-Hour", "Whether or not the hour is in 24-hour format.", false
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token)) {
      if (token.length === 1) {
        this.settings.setValue("leadingZeroes", false);
      }
      if (parseInt(token, 10) > 12 || token === "00") {
        this.settings.setValue("twentyFour", true);
      }
      this.valid = true;
    }
  }

  public setTwentyFour(value: boolean) {
    this.settings.setValue("twentyFour", value);
  }

  public getTwentyFour(): boolean {
    return this.settings.get("twentyFour").getValue();
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class MinuteSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Minute";
  public static label = "Minute";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the minute is padded with leading zeroes.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
      if (token.length === 1) {
        this.settings.setValue("leadingZeroes", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class SecondSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Second";
  public static label = "Second";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the second is padded with leading zeroes.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
      if (token.length === 1) {
        this.settings.setValue("leadingZeroes", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export enum SecondFractionType {
  Milliseconds,
  Microseconds,
  Nanoseconds,
}

export class SecondFractionSegmentType extends SegmentType {
  public static id = "SecondFraction";
  public static label = "Second Fraction";
  constructor(token: string) {
    super(token);
    this.settings.add(new DropdownSegmentTypeSetting(
      "precision", "Precision", "Precision to display.", token.length, {
        [SecondFractionType.Milliseconds]: 'Milliseconds',
        [SecondFractionType.Microseconds]: 'Microseconds',
        [SecondFractionType.Nanoseconds]: 'Nanoseconds',
      }
    ));
    if (Utils.isNumber(token)) {
      if (token.length > 6) {
        this.settings.setValue("precision", SecondFractionType.Nanoseconds);
      } else if (token.length > 3) {
        this.settings.setValue("precision", SecondFractionType.Microseconds);
      } else {
        this.settings.setValue("precision", SecondFractionType.Milliseconds);
      }
      this.valid = true;
    }
  }

  public getPrecision(): number {
    return this.settings.get("precision").getValue();
  }
}

export class AMPMSegmentType extends StringSegmentType {
  public static AMPM: string[] = ["am", "a", "pm", "p"];

  public static id = "AMPM";
  public static label = "AM/PM";

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "periods", "Periods", "Whether or not to put periods between ampm.", token.indexOf('.') !== -1
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "abbreviated", "Abbreviated", "Use a/p instead of am/pm", token.length === 1
    ));
    if (AMPMSegmentType.AMPM.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }

  public isPeriods(): boolean {
    return this.settings.get("periods").getValue();
  }

  public isAbbreviated(): boolean {
    return this.settings.get("abbreviated").getValue();
  }
}

export enum TimezoneType {
  Hour, // +-XX
  HourMinute, // +-XXXX (Z Default)
  HourMinuteSeparated, // +-XX:XX
  Short, // GMT
  Long, // America/Pacific
};

export class TimezoneSegmentType extends SegmentType {
  public static id = "Timezone";
  public static label = "Timezone ";

  // XXX: What is this???
  // private rfc: boolean = false;

  constructor(token: string) {
    super(token);
    let types: { [id: number]: string } = {
      [TimezoneType.Hour]: "+-XX",
      [TimezoneType.HourMinute]: "+-XXXX or Zulu (Z)",
      [TimezoneType.HourMinuteSeparated]: "+-XX:XX",
      [TimezoneType.Short]: "PST/GMT/CEST etc.",
      [TimezoneType.Long]: "America/Pacific, etc.",
    };
    this.settings.add(new DropdownSegmentTypeSetting(
      "timezoneType", "Timezone  Type", null, TimezoneType.HourMinute, types
    ));
    this.valid = true;
    if (/^[-+]\d{2}$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.Hour);
    } else if (token.toLowerCase() === 'z' || /^[-+]\d{4}$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.HourMinute);
    } else if (/^[-+]\d\d:\d\d$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.HourMinuteSeparated);
    } else if (Timezones.SHORT_TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.settings.setValue("timezoneType", TimezoneType.Short);
    } else if (Timezones.TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.settings.setValue("timezoneType", TimezoneType.Long);
    } else {
      this.valid = false;
    }
  }

  public getTimezoneType(): number {
    return parseInt(this.settings.get("timezoneType").getValue(), 10);
  }
}

export class EpochSegmentType extends SegmentType {
  public static id = "Epoch";
  public static label = "Unix Epoch";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "milliseconds", "Milliseconds", "Whether or not the epoch is in milliseconds.", false
    ));
    if (Utils.isNumber(token)) {
      if (parseInt(token, 10) > 2147483647) {
        this.settings.setValue("milliseconds", true);
      }
      this.valid = true;
    }
  }

  public getMilliseconds(): boolean {
    return this.settings.get("milliseconds").getValue();
  }
}

export class FillSegmentType extends SegmentType {
  public static id = "Fill";
  public static label = "Plain Text";
  constructor(token: string) {
    super(token);
    this.settings.add(new StringSegmentTypeSetting("token", "String", "The content of the fill", token));
    this.valid = true;
  }

  public getToken(): string {
    return this.settings.get("token").getValue();
  }
}

export const SEGMENT_TYPES: (typeof SegmentType)[] = [
  DayOfWeekSegmentType, DaySegmentType, TextMonthSegmentType, MonthSegmentType,
  YearSegmentType, HourSegmentType, MinuteSegmentType,
  SecondSegmentType, SecondFractionSegmentType, AMPMSegmentType,
  TimezoneSegmentType, EpochSegmentType, FillSegmentType,
  // Combined segments
  HourMinuteSegmentType, HourMinuteSecondSegmentType, YearMonthDaySegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
];
