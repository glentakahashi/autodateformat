import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IYearMonthDayHourMinuteSecondSegmentType extends ISegmentType {
    __type__: SegmentTypeType.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;
}

export function parseYearMonthDayHourMinuteSecondSegmentType(token: string): IYearMonthDayHourMinuteSecondSegmentType {
    let valid = false;
    if (token.length === 14 && isNumber(token)) {
        valid = true;
    }
    return {
        __type__: SegmentTypeType.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND,
        valid,
    };
}
