export enum SegmentTypeType {
    AMPM,
    DAY,
    DAY_OF_WEEK,
    EPOCH,
    FILL,
    HOUR,
    HOUR_MINUTE,
    HOUR_MINUTE_SECOND,
    MINUTE,
    MONTH,
    SECOND,
    SECOND_FRACTION,
    TEXT_MONTH,
    TIMEZONE,
    YEAR,
    YEAR_MONTH_DAY,
    YEAR_MONTH_DAY_HOUR_MINUTE,
    YEAR_MONTH_DAY_HOUR_MINUTE_SECOND,
}

export enum CaseStyle {
    LOWER,
    TITLE,
    UNKNOWN,
    UPPER,
}

export interface ISegmentType {
    readonly __type__: SegmentTypeType;
    valid: boolean;
}

export interface IStringSegmentType extends ISegmentType {
    caseStyle: CaseStyle;
}

export function getCaseStyle(token: string): CaseStyle {
    if (/^[a-z]+$/.test(token)) {
        return CaseStyle.LOWER;
    } else if (/^[A-Z]+$/.test(token)) {
        return CaseStyle.UPPER;
    } else if (/^[A-Z][a-z]*$/.test(token)) {
        return CaseStyle.TITLE;
    } else {
        return CaseStyle.UNKNOWN;
    }
}

export interface IZeroPaddedSegmentType extends ISegmentType {
    zeroPadded: boolean;
}
