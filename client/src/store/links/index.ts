import { Dispatch } from "redux";

import * as LinksService from "../../service/links";

export const initialState = {
  isFetching: false,
  links: [],
  error: "",
} as LinksStore.State;

export const actionTypes = {
  FETCH_LINKS_REQUEST: "FETCH_LINKS_REQUEST",
  FETCH_LINKS_SUCCESS: "FETCH_LINKS_SUCCESS",
  FETCH_LINKS_ERROR: "FETCH_LINKS_ERROR",
};

export const actions = {
  fetchLinks: () => (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.FETCH_LINKS_REQUEST,
    });

    return LinksService.getLinks()
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_LINKS_SUCCESS,
          links: response,
        });
        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.FETCH_LINKS_ERROR,
          error,
        });
        return Promise.reject(error);
      });
  },
};

const LinkReduxClass = (
  state: LinksStore.State = initialState,
  action: LinksStore.Actions
): LinksStore.State => {
  switch (action.type) {
    case "FETCH_LINKS_REQUEST":
      return { ...state, isFetching: true, error: "" };
    case "FETCH_LINKS_SUCCESS":
      return { ...state, isFetching: false, links: action.links };
    case "FETCH_LINKS_ERROR":
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default LinkReduxClass;
