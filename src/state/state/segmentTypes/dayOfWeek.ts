import {
    getCaseStyle,
    IStringSegmentType,
    SegmentTypeType,
} from "../segmentType";

const SHORT_DAYS = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export interface IDayOfWeekSegmentType extends IStringSegmentType {
    __type__: SegmentTypeType.DAY_OF_WEEK;
    abbreviated: boolean;
}

export function parseDayOfWeekSegmentType(token: string): IDayOfWeekSegmentType {
    let abbreviated = false;
    let valid = false;
    if (SHORT_DAYS.indexOf(token.toLowerCase()) !== -1) {
        abbreviated = true;
        valid = true;
    } else if (DAYS.indexOf(token.toLowerCase()) !== -1) {
        abbreviated = false;
        valid = true;
    }
    return {
        __type__: SegmentTypeType.DAY_OF_WEEK,
        abbreviated,
        caseStyle: getCaseStyle(token),
        valid,
    };
}
