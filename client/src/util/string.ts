const urlRegex = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

const alphaRegex = new RegExp(/\w\S*/g);
const camelRegex = new RegExp(/_/g);

export const isStringUrl = (urlString: string) => urlRegex.test(urlString);

export const getUrlSlug = (urlString: string) => {
  const string = urlString?.split("/");
  return string?.[string?.length - 1] || "";
};

export const camelToTitleCase = (urlString: string) =>
  urlString
    ?.replace(camelRegex, " ")
    ?.replace(
      alphaRegex,
      (string) =>
        string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
    );
