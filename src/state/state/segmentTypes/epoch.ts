import { isNumber } from "../../../common/utils";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IEpochSegmentType extends ISegmentType {
    __type__: SegmentTypeType.EPOCH;
    milliseconds: boolean;
}

export function parseEpochSegmentType(token: string): IEpochSegmentType {
    let valid = false;
    let milliseconds = false;
    if (isNumber(token)) {
        if (parseInt(token, 10) > 2147483647) {
            milliseconds = true;
        }
        valid = true;
    }
    return {
        __type__: SegmentTypeType.EPOCH,
        milliseconds,
        valid,
    };
}
