import * as reactRedux from "react-redux";

declare module "react-redux" {
  type ArgumentTypes<F extends (...args) => any> = F extends (
    ...args: infer A
  ) => any
    ? A
    : never;

  export type ExposedAction<T extends Record<string, (...args) => any>> = {
    [P in keyof T]: (
      ...args: ArgumentTypes<T[P]>
    ) => ReturnType<ReturnType<T[P]>>;
  };
}

export const mockStore = {
  links: {
    isFetchingLinks: false,
    isCreatingLink: false,
    isSearchingLink: false,
    currentLink: {
      original_url:
        "https://www.topgear.com.ph/drives/car-reviews/toyota-86-review-tguk-a2620-20220528-lfrm",
      short_url: "http://localhost:3000/ha2gxe",
      url_slug: "ha2gxe",
      clicks: 2,
      title: "2022 Toyota 86: Review, Specs, Features",
      created_at: new Date("2023-05-19T18:51:43.377Z"),
      transactions: [
        {
          geolocation: "::1",
          created_at: new Date("2023-05-19T19:02:55.849Z"),
        },
        {
          geolocation: "::1",
          created_at: new Date("2023-05-20T08:41:47.544Z"),
        },
      ],
    },
    linkList: [
      {
        original_url:
          "https://www.notion.so/Sem-6-df08f175947241c09c9d517ab43cbdd2",
        short_url: "http://localhost:3000/t8fasx",
        url_slug: "t8fasx",
        clicks: 1,
        title: "",
        created_at: new Date("2023-05-20T18:33:17.655Z"),
        transactions: [
          {
            geolocation: "::1",
            created_at: new Date("2023-05-20T18:33:22.840Z"),
          },
        ],
      },
      {
        original_url: "https://collider.com/best-mockumentary-shows-imdb/",
        short_url: "http://localhost:3000/ane314",
        url_slug: "ane314",
        clicks: 0,
        title: "10 Best Mockumentary Shows, According to IMDb",
        created_at: new Date("2023-05-20T09:49:51.893Z"),
        transactions: [],
      },
      {
        original_url:
          "https://www.topgear.com.ph/drives/car-reviews/toyota-86-review-tguk-a2620-20220528-lfrm",
        short_url: "http://localhost:3000/ha2gxe",
        url_slug: "ha2gxe",
        clicks: 2,
        title: "2022 Toyota 86: Review, Specs, Features",
        created_at: new Date("2023-05-19T18:51:43.377Z"),
        transactions: [
          {
            geolocation: "::1",
            created_at: new Date("2023-05-19T19:02:55.849Z"),
          },
          {
            geolocation: "::1",
            created_at: new Date("2023-05-20T08:41:47.544Z"),
          },
        ],
      },
    ],
    error: "",
  },
};
