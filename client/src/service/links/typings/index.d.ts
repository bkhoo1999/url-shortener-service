declare namespace LinksServiceType {
  interface Link {
    original_url: string;
    short_url: string;
    url_slug: string;
    clicks: number;
    title: string;
    transactions: Transaction[];
  }

  interface Transaction {
    geolocation: string;
    created_at: Date;
  }

  interface CreateLinkReq {
    original_url: string;
  }
}
