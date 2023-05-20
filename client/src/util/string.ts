const urlRegex = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

const alphaRegex = new RegExp(/\w\S*/g);

export const isStringUrl = (urlString: string) => urlRegex.test(urlString);

export const getUrlSlug = (urlString: string) =>
  urlString?.split("/")?.findLast((string) => string);

export const camelToTitleCase = (urlString: string) =>
  urlString
    ?.replaceAll("_", " ")
    .replaceAll(
      alphaRegex,
      (string) =>
        string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
    );
