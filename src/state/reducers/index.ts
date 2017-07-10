import { combineReducers } from "redux";
import { dateReducer } from "./dateReducer";
import { segmentsReducer } from "./segmentsReducer";

export const reducer = combineReducers({
    date: dateReducer,
    segments: segmentsReducer,
});
