import {SegmentType} from "./segmentType";
import {isNumber} from "../../common/utils";


// Should always be 24hour
export class HourMinuteSecondSegmentType extends SegmentType {
  public static id = "HourMinuteSecond";
  public static label = "Hour, Minute and Second";
  constructor(token: string) {
    super(token);
    if (token.length === 6 && isNumber(token)) {
      this.valid = true;
    }
  }
}
