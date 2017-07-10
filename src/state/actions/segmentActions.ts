import { actionCreatorFactory } from "typescript-fsa";
import { ISegment, ISegmentType } from "../state";

const actionCreator = actionCreatorFactory("Segment");

export const addSegment = actionCreator<ISegment>("ADD_SEGMENT");
export const addSegmentType = actionCreator<{ segmentIndex: number, segmentType: ISegmentType }>("ADD_SEGMENT_TYPE");
