const urlRegex = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

export const isStringUrl = (urlString: string) => urlRegex.test(urlString);

export const getUrlSlug = (urlString: string) =>
  urlString?.split("/")?.findLast((string) => string);
