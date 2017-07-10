import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IHourMinuteSecondSegmentType extends ISegmentType {
    __type__: SegmentTypeType.HOUR_MINUTE_SECOND;
}

export function parseHourMinuteSecondSegmentType(token: string): IHourMinuteSecondSegmentType {
    let valid = false;
    if (token.length === 6 && isNumber(token)) {
        valid = true;
    }
    return {
        __type__: SegmentTypeType.HOUR_MINUTE_SECOND,
        valid,
    };
}
