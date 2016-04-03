import {SegmentType, SEGMENT_TYPES} from './segment-type';

export class Segment {
  private types: { [id: string]: SegmentType};
  private selected: typeof SegmentType;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.selected = null;
    this.types = {};
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      let segmentType: typeof SegmentType = SEGMENT_TYPES[i];
      let segment: SegmentType = Object.create(segmentType.prototype);
      segment.constructor.apply(segment, new Array(token));
      if (segment.isValid()) {
        this.types[segmentType.name] = segment;
      } else {
        this.types[segmentType.name] = null;
      }
    }
  }

  public has(segmentType: typeof SegmentType): boolean {
    return this.types[segmentType.name] !== undefined && this.types[segmentType.name] !== null;
  }

  public hasEnabled(segmentType: typeof SegmentType): boolean {
    return !(!this.types[segmentType.name] || !this.types[segmentType.name].isEnabled());
  }

  // TODO: make this more semantically in line with getType
  public getTypes(): SegmentType[] {
    let types: SegmentType[] = [];
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.has(SEGMENT_TYPES[i])) {
        types.push(this.getType(SEGMENT_TYPES[i]));
      }
    }
    return types;
  }

  public getEnabledTypes(): SegmentType[] {
    let types: SegmentType[] = [];
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.hasEnabled(SEGMENT_TYPES[i])) {
        types.push(this.getType(SEGMENT_TYPES[i]));
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
    let count = 0;
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.hasEnabled(SEGMENT_TYPES[i])) {
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
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (segmentType.name !== SEGMENT_TYPES[i].name) {
        this.disableType(SEGMENT_TYPES[i]);
      }
    }
  }

  public setTypes(allowedSegmentTypes: (typeof SegmentType)[]) {
    for (let i = 0; i < allowedSegmentTypes.length; i++) {
      this.enableType(allowedSegmentTypes[i]);
    }
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (allowedSegmentTypes.indexOf(SEGMENT_TYPES[i]) === -1) {
        this.disableType(SEGMENT_TYPES[i]);
      }
    }
  }

  // returns null if zero or more than one is set, otherwise returns the only segment type set
  public getOnlySegmentType(): SegmentType {
    let found: SegmentType = null;
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.types[SEGMENT_TYPES[i].name] && this.types[SEGMENT_TYPES[i].name].isEnabled()) {
        if (found) {
          return null;
        }
        found = this.types[SEGMENT_TYPES[i].name];
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

  public setSelectedName(segmentTypeName: string) {
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (SEGMENT_TYPES[i].name === segmentTypeName) {
        this.setSelected(SEGMENT_TYPES[i]);
      }
    }
  }

  public getSelected(): typeof SegmentType {
    return this.selected;
  }

  public toString(): string {
    let str: string = "\"" + this.token + "\"";
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.types[SEGMENT_TYPES[i].name] && this.types[SEGMENT_TYPES[i].name].isEnabled()) {
        str += ", " + SEGMENT_TYPES[i].name;
      }
    }
    return str;
  }
}
