import {
    getCaseStyle,
    IStringSegmentType,
    SegmentTypeType,
} from "../segmentType";

const SHORT_MONTHS = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "sept", "oct", "nov", "dec",
];
const MONTHS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
];

export interface ITextMonthSegmentType extends IStringSegmentType {
    __type__: SegmentTypeType.TEXT_MONTH;
    abbreviated: boolean;
}

export function parseTextMonthSegmentType(token: string): ITextMonthSegmentType {
    let abbreviated = false;
    let valid = false;
    if (SHORT_MONTHS.indexOf(token.toLowerCase()) !== -1) {
        abbreviated = true;
        valid = true;
    } else if (MONTHS.indexOf(token.toLowerCase()) !== -1) {
        abbreviated = false;
        valid = true;
    }
    return {
        __type__: SegmentTypeType.TEXT_MONTH,
        abbreviated,
        caseStyle: getCaseStyle(token),
        valid,
    };
}
