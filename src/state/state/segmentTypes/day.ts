import { isNumber } from "../../../common/utils";
import {
    getCaseStyle,
    IStringSegmentType,
    IZeroPaddedSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IDaySegmentType extends IStringSegmentType, IZeroPaddedSegmentType {
    __type__: SegmentTypeType.DAY;
    prettyEnding: boolean;
}

const DATE_ENDINGS = ["st", "nd", "rd", "th"];

export function parseDaySegmentType(token: string): IDaySegmentType {
    let zeroPadded = false;
    let ending: string;
    let valid = false;
    let day;
    if (token.length === 3) {
        ending = token.substring(1, 3);
        day = token[0];
    } else if (token.length === 4) {
        ending = token.substring(2, 4);
        day = token.substring(0, 2);
    } else {
        day = token;
    }
    if ((day.length === 2 || day.length === 1) && isNumber(day) &&
        parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31) {
        if (day.length === 1) {
            zeroPadded = false;
        }
        valid = true;
    }
    if (undefined !== ending && DATE_ENDINGS.indexOf(ending.toLowerCase()) !== -1) {
        valid = true;
    } else if (ending && DATE_ENDINGS.indexOf(ending.toLowerCase()) === -1) {
        // We have to mark it back invalid because even if the day is marked valid
        // if the ending is invalid we have to invalidate the whole section
        valid = false;
    }
    return {
        __type__: SegmentTypeType.DAY,
        caseStyle: getCaseStyle(ending),
        prettyEnding: undefined !== ending,
        valid,
        zeroPadded,
    };
}
