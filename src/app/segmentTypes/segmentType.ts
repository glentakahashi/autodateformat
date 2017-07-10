import {Utils} from '../../common/utils';
import {Timezones} from '../../common/timezones';

// TODO: refactor getters and setters to have more consistent ids

// TODO: define a "split" verb and a "join" verb to combine two segments? It must do it automatically?
// i.e. -102034 = Timezone by default, be able to split into -, 102034.
// 102034 = hourminutesecond/epoch by default, etc. able to split at any spot you want -
// make the user do the functionality?? Maybe keep the combined words for ease of use, but allow to split
// Initial parsing only defines initial segments
// Put on the Segment class (make a single UI for splitting/joining the string, strings will be short so maybe just
// make an easy "drag a line bar" thing)

export interface ZeroPaddedSegmentType {
  isZeroPadded(): boolean;
}

      // <div class="segmentType" *ngIf="segmentType.valid" [class.hidden]="!segmentType.enabled && hidden && !selected" [class.disabled]="!segmentType.enabled && !selected" [class.selected]="selected">
      //   {{segmentType.getLabel()}}
      //   <segmentTypeSettings [segmentTypeSettings]="segmentType.getSettings()"></segmentTypeSettings>
      // </div>
export abstract class SegmentType {
  readonly __type__: string;
  public static label: string;

  protected settings: SegmentTypeSettings;
  protected valid: boolean = false;

  private enabled: boolean = true;
  private segment: string;

  constructor(token: string) {
    this.segment = token;
    this.settings = {};
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

export const SEGMENT_TYPES: (typeof SegmentType)[] = [
  DayOfWeekSegmentType, DaySegmentType, TextMonthSegmentType, MonthSegmentType,
  YearSegmentType, HourSegmentType, MinuteSegmentType,
  SecondSegmentType, SecondFractionSegmentType, AMPMSegmentType,
  TimezoneSegmentType, EpochSegmentType, FillSegmentType,
  // Combined segments
  HourMinuteSegmentType, HourMinuteSecondSegmentType, YearMonthDaySegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
];
