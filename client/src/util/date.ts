import moment from "moment";

export const formatDate = (date: Date) =>
  moment(date, true).utc().format("DD/MM/YYYY HH:mm:ss");
