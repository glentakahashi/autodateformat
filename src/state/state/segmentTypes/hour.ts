import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    IZeroPaddedSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IHourSegmentType extends ISegmentType, IZeroPaddedSegmentType {
    __type__: SegmentTypeType.HOUR;
    twentyFour: boolean;
}

export function parseHourSegmentType(token: string): IHourSegmentType {
    let valid = false;
    // Assume it's 0-padded because its more common
    let zeroPadded = true;
    let twentyFour = false;
    if ((token.length === 2 || token.length === 1) && isNumber(token)
        && parseInt(token, 10) >= 0 && parseInt(token, 10) < 2
    ) {
        if (token.length === 1) {
            zeroPadded = false;
        }
        if (parseInt(token, 10) > 12 || token === "00") {
            twentyFour = true;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.HOUR,
        twentyFour,
        valid,
        zeroPadded,
    };
}
