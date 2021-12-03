import { createStore, combineReducers } from "redux";

import { reducerDepartments } from "./reducers/departmentsReduser";
import { reducerEmployees } from "./reducers/employeesReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  reducerDepartments,
  reducerEmployees
})

export const store = createStore(rootReducer, composeWithDevTools());
