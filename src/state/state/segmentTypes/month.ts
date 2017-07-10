import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    IZeroPaddedSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IMonthSegmentType extends ISegmentType, IZeroPaddedSegmentType {
    __type__: SegmentTypeType.MONTH;
}

export function parseMonthSegmentType(token: string): IMonthSegmentType {
    let valid = false;
    // Assume it's 0-padded because its more common
    let zeroPadded = true;
    if ((token.length === 2 || token.length === 1) && isNumber(token)
        && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 12) {
        if (token.length === 1) {
            zeroPadded = false;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.MONTH,
        valid,
        zeroPadded,
    };
}
