import { ISegmentType, SegmentTypeType } from "./segmentType";

export interface ISegment {
    types: ISegmentType[];
    selected: SegmentTypeType;
    token: string;
}
