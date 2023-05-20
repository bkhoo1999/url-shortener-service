const apiUrl = {
  development: "http://localhost:3000",
  production: "https://ben-ly.herokuapp.com",
};

export const API_URL =
  process.env.NODE_ENV === "development"
    ? apiUrl?.development
    : apiUrl?.production;
