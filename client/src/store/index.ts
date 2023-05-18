import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import links, { initialState as linksState } from "./links";

export interface State {
  links: LinksStore.State;
}

const initialState = {
  links: linksState,
} as State;

const appReducer = combineReducers({
  links,
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

const store = () => {
  const middlewares = [thunk, logger];

  const composeEnhancers =
    window?.["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default store();
