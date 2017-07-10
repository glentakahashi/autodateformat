import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
    setDate,
} from "../actions";
import { INITIAL_STATE } from "../state";

export const dateReducer = reducerWithInitialState(INITIAL_STATE.date)
    .case(setDate, (_state, date) => date)
    .build();
