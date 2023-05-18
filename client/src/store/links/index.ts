import { Dispatch } from "redux";

import * as LinksService from "../../service/links";

export const initialState = {
  isFetchingLinks: false,
  isCreatingLink: false,
  newLink: undefined,
  links: [],
  error: "",
} as LinksStore.State;

export const actionTypes = {
  FETCH_LINKS_REQUEST: "FETCH_LINKS_REQUEST",
  FETCH_LINKS_SUCCESS: "FETCH_LINKS_SUCCESS",
  FETCH_LINKS_ERROR: "FETCH_LINKS_ERROR",
  CREATE_LINK_REQUEST: "CREATE_LINK_REQUEST",
  CREATE_LINK_SUCCESS: "CREATE_LINK_SUCCESS",
  CREATE_LINK_ERROR: "CREATE_LINK_ERROR",
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

  createLink:
    (req: LinksServiceType.CreateLinkReq) => (dispatch: Dispatch<any>) => {
      dispatch({
        type: actionTypes.CREATE_LINK_REQUEST,
      });

      return LinksService.createLink(req)
        .then((response) => {
          dispatch({
            type: actionTypes.CREATE_LINK_SUCCESS,
            newLink: response,
          });
          return Promise.resolve(response);
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.CREATE_LINK_ERROR,
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
      return { ...state, isFetchingLinks: true, error: "" };
    case "FETCH_LINKS_SUCCESS":
      return { ...state, isFetchingLinks: false, links: action.links };
    case "FETCH_LINKS_ERROR":
      return { ...state, isFetchingLinks: false, error: action.error };
    case "CREATE_LINK_REQUEST":
      return { ...state, isCreatingLink: true, error: "" };
    case "CREATE_LINK_SUCCESS":
      return { ...state, isCreatingLink: false, newLink: action.newLink };
    case "CREATE_LINK_ERROR":
      return { ...state, isCreatingLink: false, error: action.error };
    default:
      return state;
  }
};

export default LinkReduxClass;
