import { combineReducers } from "redux";
import exampleReducer from "./example";
import { examplePersist } from "../persist/example";

export default combineReducers({
    example:examplePersist(exampleReducer),
});
