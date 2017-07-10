import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IYearMonthDayHourMinuteSegmentType extends ISegmentType {
    __type__: SegmentTypeType.YEAR_MONTH_DAY_HOUR_MINUTE;
}

export function parseYearMonthDayHourMinuteSegmentType(token: string): IYearMonthDayHourMinuteSegmentType {
    let valid = false;
    if (token.length === 12 && isNumber(token)) {
        valid = true;
    }
    return {
        __type__: SegmentTypeType.YEAR_MONTH_DAY_HOUR_MINUTE,
        valid,
    };
}
