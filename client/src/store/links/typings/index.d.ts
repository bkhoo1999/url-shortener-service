declare namespace LinksStore {
  interface State {
    isFetchingLinks: boolean;
    isCreatingLink: boolean;
    newLink: LinksServiceType.Link;
    linkList: LinksServiceType.Link[];
    error: string;
  }

  type setFetchLinksRequestAction = { type: "FETCH_LINKS_REQUEST" };
  type setFetchLinksSuccessAction = {
    type: "FETCH_LINKS_SUCCESS";
    linkList: LinksServiceType.Link[];
  };
  type setFetchLinksErrorAction = { type: "FETCH_LINKS_ERROR"; error: string };

  type setCreateLinkRequestAction = { type: "CREATE_LINK_REQUEST" };
  type setCreateLinkSuccessAction = {
    type: "CREATE_LINK_SUCCESS";
    newLink: LinksServiceType.Link;
  };
  type setCreateLinkErrorAction = { type: "CREATE_LINK_ERROR"; error: string };

  type Actions =
    | setFetchLinksRequestAction
    | setFetchLinksSuccessAction
    | setFetchLinksErrorAction
    | setCreateLinkRequestAction
    | setCreateLinkSuccessAction
    | setCreateLinkErrorAction;
}
