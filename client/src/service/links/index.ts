import FetchUtil from "../../utils/fetch";
import { API_URL } from "../../utils/constant";

export const getLinks = (): Promise<LinksServiceType.Link[]> =>
  FetchUtil.callFetch({
    url: `${API_URL}/api/links`,
    method: "GET",
  });

export const createLink = (
  req: LinksServiceType.CreateLinkReq
): Promise<LinksServiceType.Link> =>
  FetchUtil.callFetch({
    url: `${API_URL}/api/links`,
    method: "POST",
    body: req,
  });
