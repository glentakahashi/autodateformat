import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
    addSegment,
    addSegmentType,
} from "../actions";
import { INITIAL_STATE } from "../state";

export const segmentsReducer = reducerWithInitialState(INITIAL_STATE.segments)
    .case(addSegment, (state, segment) => [...state, segment])
    .case(addSegmentType, (state, { segmentIndex, segmentType }) => {
        const newState = [ ...state ];
        newState[segmentIndex].types.push(segmentType);
        return newState;
    })
    .build();
