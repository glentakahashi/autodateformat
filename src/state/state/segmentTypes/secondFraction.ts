import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export enum SecondFractionPrecision {
    MILLISECONDS,
    MICROSECNDS,
    NANOSECONDS,
}

export interface ISecondFractionSegmentType extends ISegmentType {
    __type__: SegmentTypeType.SECOND_FRACTION;
    precision: SecondFractionPrecision;
}

export function parseSecondFractionSegmentType(token: string): ISecondFractionSegmentType {
    let valid = false;
    let precision: SecondFractionPrecision;
    if (isNumber(token)) {
        if (token.length > 6) {
            precision = SecondFractionPrecision.NANOSECONDS;
        } else if (token.length > 6) {
            precision = SecondFractionPrecision.MICROSECNDS;
        } else {
            precision = SecondFractionPrecision.MILLISECONDS;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.SECOND_FRACTION,
        precision,
        valid,
    };
}
