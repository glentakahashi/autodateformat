import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    IZeroPaddedSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IMinuteSegmentType extends ISegmentType, IZeroPaddedSegmentType {
    __type__: SegmentTypeType.MINUTE;
}

export function parseMinuteSegmentType(token: string): IMinuteSegmentType {
    let valid = false;
    // Assume it's 0-padded because its more common
    let zeroPadded = true;
    if ((token.length === 2 || token.length === 1) && isNumber(token)
        && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60
    ) {
        if (token.length === 1) {
            zeroPadded = false;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.MINUTE,
        valid,
        zeroPadded,
    };
}
