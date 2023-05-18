import FetchUtil from "../../utils/fetch";
import { API_URL } from "../../utils/constant";

export const getLinks = (): Promise<LinksServiceType.Transaction[]> =>
  FetchUtil.callFetch({
    url: `${API_URL}/api/links/xxx`,
    method: "GET",
  });
