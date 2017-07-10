import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IHourMinuteSegmentType extends ISegmentType {
    __type__: SegmentTypeType.HOUR_MINUTE;
}

export function parseHourMinuteSegmentType(token: string): IHourMinuteSegmentType {
    let valid = false;
    if (token.length === 4 && isNumber(token)) {
        valid = true;
    }
    return {
        __type__: SegmentTypeType.HOUR_MINUTE,
        valid,
    };
}
