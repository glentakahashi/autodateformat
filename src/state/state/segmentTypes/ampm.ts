import {
    getCaseStyle,
    IStringSegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IAMPMSegmentType extends IStringSegmentType {
    __type__: SegmentTypeType.AMPM;
    periods: boolean;
    abbreviated: boolean;
}

const AMPM_VALUES = ["am", "a", "pm", "p"];

export function parseAMPMSegmentType(token: string): IAMPMSegmentType {
    return {
        __type__: SegmentTypeType.AMPM,
        abbreviated: token.length === 1,
        caseStyle: getCaseStyle(token),
        periods: token.indexOf(".") !== -1,
        valid: AMPM_VALUES.indexOf(token.toLowerCase().replace(".", "")) !== -1,
    };
}
