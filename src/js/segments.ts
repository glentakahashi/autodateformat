///<reference path='util.ts'/>
///<reference path='timezones.ts'/>
//
//TODO: refactor getters and setters to have more consistent names
//TODO: switch everything to use ENUM

//enum SegmentTypes {
  //StringSegmentType,
//}

class SegmentType {
  valid: boolean = false;
  enabled: boolean = true;
  segment: string;
  //allows typescript to compile so we can use native ecmascript .name property
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
  //probably want something more supported?
  public static name: string;

  constructor(token: string) {
    this.segment = token;
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
}

class StringSegmentType extends SegmentType {
  caseStyle: string;

  updateCaseStyle(token: string) {
    this.caseStyle = caseStyle(token);
  }

  public getCaseStyle(): string {
    return this.caseStyle;
  }
}

class ShortDaySegmentType extends StringSegmentType {
  short_days: string[] = ['mon', 'tues', 'tue', 'wed', 'thu', 'thurs', 'fri', 'sat', 'sun'];
  constructor(token: string) {
    super(token);
    if(this.short_days.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class LongDaySegmentType extends StringSegmentType {
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  constructor(token: string) {
    super(token);
    if(this.days.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class ShortMonthSegmentType extends StringSegmentType {
  short_months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec'];
  constructor(token: string) {
    super(token);
    if(this.short_months.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class LongMonthSegmentType extends StringSegmentType {
  months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  constructor(token: string) {
    super(token);
    if(this.months.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class DaySegmentType extends StringSegmentType {
  public static date_endings: string[] = ['st', 'nd', 'rd', 'th'];
  leading_zero: boolean;
  pretty_ending: boolean = false;
  constructor(token: string) {
    super(token);
    var ending: string;
    if(token.length == 3) {
      this.updateCaseStyle(token.substring(1,2));
      ending = token.substring(1,3);
      token = token[0];
    } else if(token.length == 4) {
      this.updateCaseStyle(token.substring(1,2));
      ending = token.substring(2,4);
      token = token.substring(0,2);
    }
    if((token.length == 2 || token.length == 1) && isInteger(token) && parseInt(token) >= 1 && parseInt(token) <= 31) {
      this.updateCaseStyle(token);
      if(token[0] == '0') {
        this.leading_zero = true;
      }
      this.valid = true;
    }
    if(ending != null && DaySegmentType.date_endings.indexOf(ending.toLowerCase()) != -1) {
      this.pretty_ending = true;
    } else if (ending != null && DaySegmentType.date_endings.indexOf(ending.toLowerCase()) == -1) {
      this.valid = false;
    }
  }
}

class MonthSegmentType extends SegmentType {
  leading_zero: boolean = false;
  constructor(token: string) {
    super(token);
    if((token.length == 2 || token.length == 1) && isInteger(token) && parseInt(token) >= 1 && parseInt(token) <= 12) {
      if(token[0] == '0') {
        this.leading_zero = true;
      }
      this.valid = true;
    }
  }
}

//For the sake of usability, this assumes you never have a 1-3 digit year.
class YearSegmentType extends SegmentType {
  leading_zeroes: boolean = false;
  constructor(token: string) {
    super(token);
    if(token.length == 4 && isInteger(token)) {
      if(token[0] == '0') {
        this.leading_zeroes = true;
      }
      this.valid = true;
    }
  }
}

class ShortYearSegmentType extends SegmentType {
  leading_zeroes: boolean = false;
  constructor(token: string) {
    super(token);
    if(token.length == 2 && isInteger(token)) {
      if(token[0] == '0') {
        this.leading_zeroes = true;
      }
      this.valid = true;
    }
  }
}

class HourMinuteSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    if(token.length == 4 && isInteger(token)) {
      this.valid = true;
    }
  }
}

class HourMinuteSecondSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    if(token.length == 6 && isInteger(token)) {
      this.valid = true;
    }
  }
}

class HourSegmentType extends SegmentType {
  leading_zeroes: boolean = false;
  twenty_four: boolean = false;
  constructor(token: string) {
    super(token);
    if((token.length == 2 || token.length == 1) && isInteger(token)) {
      if(token[0] == '0') {
        this.leading_zeroes = true;
      }
      if(parseInt(token) > 12 || token == '00') {
        this.twenty_four = true;
      }
      this.valid = true;
    }
  }

  public setTwentyFour(value: boolean) {
    this.twenty_four = value;
  }
}

class MinuteSegmentType extends SegmentType {
  leading_zeroes: boolean = false;
  constructor(token: string) {
    super(token);
    if((token.length == 2 || token.length == 1) && isInteger(token) && parseInt(token) >=0 && parseInt(token) < 60) {
      if(token[0] == '0') {
        this.leading_zeroes = true;
      }
      this.valid = true;
    }
  }
}

class SecondSegmentType extends SegmentType {
  leading_zeroes: boolean = false;
  constructor(token: string) {
    super(token);
    if((token.length == 2 || token.length == 1) && isInteger(token) && parseInt(token) >=0 && parseInt(token) < 60) {
      if(token[0] == '0') {
        this.leading_zeroes = true;
      }
      this.valid = true;
    }
  }
}

class MillisecondSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    if(isInteger(token)) {
      this.valid = true;
    }
  }
}

class AMPMSegmentType extends StringSegmentType {
  ampm: string[] = ['am', 'a', 'pm', 'p'];
  constructor(token: string) {
    super(token);
    if(this.ampm.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class ShortTimezoneSegmentType extends StringSegmentType {
  short_timezones: string[] = [
    'acdt', 'acst', 'act', 'act', 'adt', 'aedt', 'aest', 'aft', 'akdt', 'akst', 'amst', 'amt', 'amt', 'art', 'ast', 'ast', 'awdt', 'awst', 'azost', 'azt', 'bdt', 'bdt', 'biot', 'bit',
    'bot', 'brst', 'brt', 'bst', 'bst', 'bst', 'btt', 'cat', 'cct', 'cdt', 'cdt', 'cedt', 'cest', 'cet', 'chadt', 'chast', 'chot', 'chst', 'chut', 'cist', 'cit', 'ckt', 'clst', 'clt', 'cost',
    'cot', 'cst', 'cst', 'cst', 'cst', 'cst', 'ct', 'cvt', 'cwst', 'cxt', 'davt', 'ddut', 'dft', 'easst', 'east', 'eat', 'ect', 'ect', 'edt', 'eedt', 'eest', 'eet', 'egst', 'egt', 'eit',
    'est', 'est', 'fet', 'fjt', 'fkst', 'fkst', 'fkt', 'fnt', 'galt', 'gamt', 'get', 'gft', 'gilt', 'git', 'gmt', 'gst', 'gst', 'gyt', 'hadt', 'haec', 'hast', 'hkt', 'hmt', 'hovt', 'hst',
    'ibst', 'ict', 'idt', 'iot', 'irdt', 'irkt', 'irst', 'ist', 'ist', 'ist', 'jst', 'kgt', 'kost', 'krat', 'kst', 'lhst', 'lhst', 'lint', 'magt', 'mart', 'mawt', 'mdt', 'met', 'mest', 'mht',
    'mist', 'mit', 'mmt', 'msk', 'mst', 'mst', 'mst', 'mut', 'mvt', 'myt', 'nct', 'ndt', 'nft', 'npt', 'nst', 'nt', 'nut', 'nzdt', 'nzst', 'omst', 'orat', 'pdt', 'pet', 'pett', 'pgt',
    'phot', 'pkt', 'pmdt', 'pmst', 'pont', 'pst', 'pst', 'pyst', 'pyt', 'ret', 'rott', 'sakt', 'samt', 'sast', 'sbt', 'sct', 'sgt', 'slst', 'sret', 'srt', 'sst', 'sst', 'syot', 'taht', 'tha',
    'tft', 'tjt', 'tkt', 'tlt', 'tmt', 'tot', 'tvt', 'uct', 'ulat', 'usz1', 'utc', 'uyst', 'uyt', 'uzt', 'vet', 'vlat', 'volt', 'vost', 'vut', 'wakt', 'wast', 'wat', 'wedt', 'west', 'wet',
    'wit', 'wst', 'yakt', 'yekt', 'z'];
  z: boolean = false;
  constructor(token: string) {
    super(token);
    if(this.short_timezones.indexOf(token.toLowerCase()) != -1) {
      if(token.toLowerCase() == 'z') {
        this.z = true;
      }
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

class LongTimezoneSegmentType extends StringSegmentType {
  constructor(token: string) {
    super(token);
    if(timezones.indexOf(token.toLowerCase()) != -1) {
      this.updateCaseStyle(token);
      this.valid = true;
    }
  }
}

//0 = +-XX
//1 = +-XXXX
//2 = +-XXXXXX
//3 = +-XX:XX
//4 = +-XX:XX:XX
enum TimezoneOffsetType {Hour = 0, HourMinute = 1, HourMinuteSecond = 2, HourMinuteSeparated = 3, HourMinuteSecondSeparated = 4};

class TimezoneOffsetSegmentType extends SegmentType {
  rfc: boolean = false;
  timezone_type: TimezoneOffsetType = TimezoneOffsetType.Hour;
  constructor(token: string) {
    super(token);
    if(/^[-+](\d\d)((:\d\d){1,2}|(\d\d){1,2})?$/.test(token)) {
      //XX
      if(/^[-+]\d{2}$/.test(token)) {
        this.timezone_type = TimezoneOffsetType.Hour;
      //XXXX
      } else if(/^[-+]\d{4}$/.test(token)) {
        this.timezone_type = TimezoneOffsetType.HourMinute;
      //XXXXXX
      } else if(/^[-+]\d{6}$/.test(token)) {
        this.timezone_type = TimezoneOffsetType.HourMinuteSecond;
      //XX:XX
      } else if(/^[-+]\d\d:\d\d$/.test(token)) {
        this.timezone_type = TimezoneOffsetType.HourMinuteSeparated;
      //XX:XX:XX
      } else if(/^[-+]\d\d:\d\d:\d\d$/.test(token)) {
        this.timezone_type = TimezoneOffsetType.HourMinuteSecondSeparated;
      }
      this.valid = true;
    }
  }
}

class EpochSegmentType extends SegmentType {
  millisecond: boolean = false;
  constructor(token: string) {
    super(token);
    if(isInteger(token)) {
      if(parseInt(token) > 2147483647) {
        this.millisecond = true;
      }
      this.valid = true;
    }
  }
}

class FillSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    this.valid = true;
  }
}

var segmentTypes: (typeof SegmentType)[] = [
  ShortDaySegmentType, LongDaySegmentType, ShortMonthSegmentType, LongMonthSegmentType, DaySegmentType,
  MonthSegmentType, YearSegmentType, ShortYearSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType,
  HourSegmentType, MinuteSegmentType, SecondSegmentType, MillisecondSegmentType, AMPMSegmentType,
  ShortTimezoneSegmentType, LongTimezoneSegmentType, TimezoneOffsetSegmentType, EpochSegmentType, FillSegmentType
];

class Segment {
  types: { [id: string]: SegmentType};
  selected: typeof SegmentType;
  token: string;
  constructor(token: string) {
    this.token = token;
    this.types = {};
    for(var i: number = 0; i < segmentTypes.length; i++) {
      var segmentType: typeof SegmentType = segmentTypes[i];
      var segment: SegmentType = new segmentType(token);
      if(segment.isValid()) {
        this.types[segmentType.name] = segment;
      } else {
        this.types[segmentType.name] = null;
      }
    }
  }

  public has(segmentType: typeof SegmentType): boolean {
    return this.types[segmentType.name] != null;
  }

  public hasEnabled(segmentType: typeof SegmentType): boolean {
    return !(!this.types[segmentType.name] || !this.types[segmentType.name].isEnabled());
  }


  //TODO: make this more semanticly in line with getType
  public getTypes(): SegmentType[] {
    var types: SegmentType[] = [];
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(this.has(segmentTypes[i])) {
        types.push(this.getType(segmentTypes[i]));
      }
    }
    return types;
  }

  public getEnabledTypes(): SegmentType[] {
    var types: SegmentType[] = [];
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(this.hasEnabled(segmentTypes[i])) {
        types.push(this.getType(segmentTypes[i]));
      }
    }
    return types;
  }

  public getType(segmentType: typeof SegmentType): SegmentType {
    if(this.has(segmentType)) {
      return this.types[segmentType.name];
    }
    return null;
  }

  public getToken(): string {
    return this.token;
  }

  public numTypes(): number {
    var count: number = 0;
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(this.hasEnabled(segmentTypes[i])) {
        count += 1;
      }
    }
    return count;
  }

  public enableType(segmentType: typeof SegmentType){
    if(this.types[segmentType.name]) {
      this.types[segmentType.name].enable();
    }
  }

  public disableType(segmentType: typeof SegmentType){
    if(this.types[segmentType.name]) {
      this.types[segmentType.name].disable();
    }
  }

  public setType(segmentType: typeof SegmentType) {
    this.enableType(segmentType);
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(segmentType.name != segmentTypes[i].name) {
        this.disableType(segmentTypes[i]);
      }
    }
  }

  public setTypes(allowedSegmentTypes: (typeof SegmentType)[]) {
    for(var i: number = 0; i<allowedSegmentTypes.length; i++) {
      this.enableType(allowedSegmentTypes[i]);
    }
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(allowedSegmentTypes.indexOf(segmentTypes[i]) == -1) {
        this.disableType(segmentTypes[i]);
      }
    }
  }

  //returns null if zero or more than one is set, otherwise returns the only segment type set
  public getOnlySegmentType(): SegmentType {
    var found: SegmentType = null;
    for(var j: number = 0; j<segmentTypes.length; j++) {
      if(this.types[segmentTypes[j].name] && this.types[segmentTypes[j].name].isEnabled()) {
        if(found) {
          return null;
        }
        found = this.types[segmentTypes[j].name];
      }
    }
    return found;
  }

  public setSelected(segmentType: typeof SegmentType) {
    if(this.has(segmentType)) {
      this.enableType(segmentType);
      this.selected = segmentType;
    }
  }

  public getSelected(): typeof SegmentType {
    return this.selected;
  }

  public toString(): string {
    var str: string = "\"" + this.token + "\"";
    for(var i: number = 0; i<segmentTypes.length; i++) {
      if(this.types[segmentTypes[i].name] && this.types[segmentTypes[i].name].isEnabled()) {
        str += ", " + segmentTypes[i].name;
      }
    }
    return str;
  }
}
