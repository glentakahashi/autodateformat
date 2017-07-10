import { ISegment } from "./segment";

export interface IDateTimeFormatAppState {
    segments: ISegment[];
    date: string;
}

export const INITIAL_STATE: IDateTimeFormatAppState = {
    date: "",
    segments: [],
};
