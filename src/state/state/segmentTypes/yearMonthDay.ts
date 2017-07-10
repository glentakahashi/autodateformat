import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IYearMonthDaySegmentType extends ISegmentType {
    __type__: SegmentTypeType.YEAR_MONTH_DAY;
}

export function parseYearMonthSegmentType(token: string): IYearMonthDaySegmentType {
    let valid = false;
    if (token.length === 8 && isNumber(token)) {
        valid = true;
    }
    return {
        __type__: SegmentTypeType.YEAR_MONTH_DAY,
        valid,
    };
}
