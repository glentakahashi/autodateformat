import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    IZeroPaddedSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IYearSegmentType extends ISegmentType, IZeroPaddedSegmentType {
    __type__: SegmentTypeType.YEAR;
    twoDigit: boolean;
}

export function parseYearSegmentType(token: string): IYearSegmentType {
    let valid = false;
    let twoDigit = false;
    if ((token.length === 4 || token.length === 2) && isNumber(token)) {
        if (token.length === 2) {
            twoDigit = true;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.YEAR,
        twoDigit,
        valid,
        zeroPadded: true,
    };
}
