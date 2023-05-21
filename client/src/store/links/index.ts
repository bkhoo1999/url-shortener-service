import { Dispatch } from "redux";

import * as LinksService from "../../service/links";

export const initialState = {
  isFetchingLinks: false,
  isCreatingLink: false,
  isSearchingLink: false,
  currentLink: undefined,
  linkList: [],
  error: "",
} as LinksStore.State;

export const actionTypes = {
  FETCH_LINKS_REQUEST: "FETCH_LINKS_REQUEST",
  FETCH_LINKS_SUCCESS: "FETCH_LINKS_SUCCESS",
  FETCH_LINKS_ERROR: "FETCH_LINKS_ERROR",
  CREATE_LINK_REQUEST: "CREATE_LINK_REQUEST",
  CREATE_LINK_SUCCESS: "CREATE_LINK_SUCCESS",
  CREATE_LINK_ERROR: "CREATE_LINK_ERROR",
  SEARCH_LINK_REQUEST: "SEARCH_LINK_REQUEST",
  SEARCH_LINK_SUCCESS: "SEARCH_LINK_SUCCESS",
  SEARCH_LINK_ERROR: "SEARCH_LINK_ERROR",
  CLEAR_LINK: "CLEAR_LINK",
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
          linkList: response,
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

  searchLink: (urlSlug: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.SEARCH_LINK_REQUEST,
    });

    return LinksService.searchLink(urlSlug)
      .then((response) => {
        dispatch({
          type: actionTypes.SEARCH_LINK_SUCCESS,
          searchLink: response,
        });
        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SEARCH_LINK_ERROR,
          error,
        });
        return Promise.reject(error);
      });
  },

  clearLink: () => (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.CLEAR_LINK,
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
      return { ...state, isFetchingLinks: false, linkList: action.linkList };
    case "FETCH_LINKS_ERROR":
      return { ...state, isFetchingLinks: false, error: action.error };
    case "CREATE_LINK_REQUEST":
      return { ...state, isCreatingLink: true, error: "" };
    case "CREATE_LINK_SUCCESS":
      return { ...state, isCreatingLink: false, currentLink: action.newLink };
    case "CREATE_LINK_ERROR":
      return { ...state, isCreatingLink: false, error: action.error };
    case "SEARCH_LINK_REQUEST":
      return { ...state, isSearchingLink: true, error: "" };
    case "SEARCH_LINK_SUCCESS":
      return {
        ...state,
        isSearchingLink: false,
        currentLink: action.searchLink,
      };
    case "SEARCH_LINK_ERROR":
      return { ...state, isSearchingLink: false, error: action.error };
    case "CLEAR_LINK":
      return { ...state, currentLink: undefined, error: "" };
    default:
      return state;
  }
};

export default LinkReduxClass;
