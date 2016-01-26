///<reference path='./interfaces.d.ts'/>
///<reference path='./SegmentType.tsx'/>

let segmentTypes: (typeof SegmentType)[] = [
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
    for (let i: number = 0; i < segmentTypes.length; i++) {
      let segmentType: typeof SegmentType = segmentTypes[i];
      let segment: SegmentType = new segmentType(token);
      if (segment.isValid()) {
        this.types[segmentType.name] = segment;
      } else {
        this.types[segmentType.name] = null;
      }
    }
  }

  public has(segmentType: typeof SegmentType): boolean {
    return this.types[segmentType.name] !== null;
  }

  public hasEnabled(segmentType: typeof SegmentType): boolean {
    return !(!this.types[segmentType.name] || !this.types[segmentType.name].isEnabled());
  }

  // TODO: make this more semantically in line with getType
  public getTypes(): SegmentType[] {
    let types: SegmentType[] = [];
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (this.has(segmentTypes[i])) {
        types.push(this.getType(segmentTypes[i]));
      }
    }
    return types;
  }

  public getEnabledTypes(): SegmentType[] {
    let types: SegmentType[] = [];
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (this.hasEnabled(segmentTypes[i])) {
        types.push(this.getType(segmentTypes[i]));
      }
    }
    return types;
  }

  public getType(segmentType: typeof SegmentType): SegmentType {
    if (this.has(segmentType)) {
      return this.types[segmentType.name];
    }
    return null;
  }

  public getToken(): string {
    return this.token;
  }

  public numTypes(): number {
    let count: number = 0;
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (this.hasEnabled(segmentTypes[i])) {
        count += 1;
      }
    }
    return count;
  }

  public enableType(segmentType: typeof SegmentType) {
    if (this.types[segmentType.name]) {
      this.types[segmentType.name].enable();
    }
  }

  public disableType(segmentType: typeof SegmentType) {
    if (this.types[segmentType.name]) {
      this.types[segmentType.name].disable();
    }
  }

  public setType(segmentType: typeof SegmentType) {
    this.enableType(segmentType);
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (segmentType.name !== segmentTypes[i].name) {
        this.disableType(segmentTypes[i]);
      }
    }
  }

  public setTypes(allowedSegmentTypes: (typeof SegmentType)[]) {
    for (let i: number = 0; i < allowedSegmentTypes.length; i++) {
      this.enableType(allowedSegmentTypes[i]);
    }
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (allowedSegmentTypes.indexOf(segmentTypes[i]) === -1) {
        this.disableType(segmentTypes[i]);
      }
    }
  }

  // returns null if zero or more than one is set, otherwise returns the only segment type set
  public getOnlySegmentType(): SegmentType {
    let found: SegmentType = null;
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (this.types[segmentTypes[i].name] && this.types[segmentTypes[i].name].isEnabled()) {
        if (found) {
          return null;
        }
        found = this.types[segmentTypes[i].name];
      }
    }
    return found;
  }

  public setSelected(segmentType: typeof SegmentType) {
    if (this.has(segmentType)) {
      this.enableType(segmentType);
      this.selected = segmentType;
    }
  }

  public getSelected(): typeof SegmentType {
    return this.selected;
  }

  public toString(): string {
    let str: string = "\"" + this.token + "\"";
    for (let i: number = 0; i < segmentTypes.length; i++) {
      if (this.types[segmentTypes[i].name] && this.types[segmentTypes[i].name].isEnabled()) {
        str += ", " + segmentTypes[i].name;
      }
    }
    return str;
  }
}
