declare namespace LinksStore {
  interface State {
    isFetching: boolean;
    links: any[];
    error: string;
  }

  type setFetchLinksRequestAction = { type: "FETCH_LINKS_REQUEST" };
  type setFetchLinksSuccessAction = {
    type: "FETCH_LINKS_SUCCESS";
    links: any[];
  };
  type setFetchLinksErrorAction = { type: "FETCH_LINKS_ERROR"; error: string };

  type Actions =
    | setFetchLinksRequestAction
    | setFetchLinksSuccessAction
    | setFetchLinksErrorAction;
}
