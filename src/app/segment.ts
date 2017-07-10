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
        this.types[segmentType.id] = segment;
      } else {
        this.types[segmentType.id] = null;
      }
    }
  }

  public has(segmentType: typeof SegmentType): boolean {
    return this.types[segmentType.id] !== undefined && this.types[segmentType.id] !== null;
  }

  public hasEnabled(segmentType: typeof SegmentType): boolean {
    return !(!this.types[segmentType.id] || !this.types[segmentType.id].isEnabled());
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

  public getTypesSorted(): SegmentType[] {
    return this.getTypes().sort((a: SegmentType, b: SegmentType): number => {
      let valA = (a.getID() === this.getSelectedType().id) ? 3 : (a.isEnabled() ? 2 : (a.isValid() ? 1 : 0));
      let valB = (b.getID() === this.getSelectedType().id) ? 3 : (b.isEnabled() ? 2 : (b.isValid() ? 1 : 0));
      // We want highest values first
      return valB - valA;
    });
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
      return this.types[segmentType.id];
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
    if (this.types[segmentType.id]) {
      this.types[segmentType.id].enable();
    }
  }

  public disableType(segmentType: typeof SegmentType) {
    if (this.types[segmentType.id]) {
      this.types[segmentType.id].disable();
    }
  }

  public setType(segmentType: typeof SegmentType) {
    this.enableType(segmentType);
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (segmentType.id !== SEGMENT_TYPES[i].id) {
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
      if (this.types[SEGMENT_TYPES[i].id] && this.types[SEGMENT_TYPES[i].id].isEnabled()) {
        if (found) {
          return null;
        }
        found = this.types[SEGMENT_TYPES[i].id];
      }
    }
    return found;
  }

  public setSelected(segmentType: typeof SegmentType) {
    if (this.has(segmentType)) {
      //this.enableType(segmentType);
      this.selected = segmentType;
    }
  }

  public setSelectedID(segmentTypeID: string) {
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (SEGMENT_TYPES[i].id === segmentTypeID) {
        this.setSelected(SEGMENT_TYPES[i]);
      }
    }
  }

  public getSelectedType(): typeof SegmentType {
    return this.selected;
  }

  public getSelected(): SegmentType {
    return this.getType(this.selected);
  }

  public toString(): string {
    let str: string = "\"" + this.token + "\"";
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      if (this.types[SEGMENT_TYPES[i].id] && this.types[SEGMENT_TYPES[i].id].isEnabled()) {
        str += ", " + SEGMENT_TYPES[i].id;
      }
    }
    return str;
  }
}

// @Component({
//   directives: [SegmentTypeComponent],
//   inputs: ['segment', 'datetime'],
//   selector: 'segment',
//   template: `
//     <div class="segment">
//       <pre class="token">{{segment.token}}</pre>
//       <div><a (click)="datetime.splitSegment(segment)">Split</a> | <a (click)="datetime.editSegment(segment)">Edit</a> | <a (click)="datetime.deleteSegment(segment)">Delete</a></div>
//       <segmentType *ngFor="#segmentType of segment.getTypes()" [segmentType]="segmentType" (click)="setSelected(segment,segmentType)" [hidden]="!showDisabled" [selected]="isSelected(segment, segmentType)"></segmentType>
//       <div class="segment-type-expander" (click)="toggleDisabled()">&darr;</div>
//     </div>
//   `,
// })
// export class SegmentComponent {
//   private showDisabled = false;

//   public setSelected(segment: Segment, segmentType: SegmentType): void {
//     segment.setSelectedID(segmentType.getID());
//   }

//   public toggleDisabled(): void {
//     this.showDisabled = !this.showDisabled;
//   }

//   public isSelected(segment: Segment, segmentType: SegmentType): boolean {
//     if (!segment.getSelected()) {
//       return false;
//     }
//     return segment.getSelectedType().id === segmentType.getID();
//   }
// }
