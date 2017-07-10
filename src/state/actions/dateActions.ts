import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory("Date");

export const setDate = actionCreator<string>("SET_DATE");
