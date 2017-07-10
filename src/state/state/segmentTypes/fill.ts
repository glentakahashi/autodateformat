import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export interface IFillSegmentType extends ISegmentType {
    __type__: SegmentTypeType.FILL;
}

export function parseFillSegmentType(_token: string): IFillSegmentType {
    return {
        __type__: SegmentTypeType.FILL,
        valid: true,
    };
}
