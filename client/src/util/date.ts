import moment from "moment";

export const formatDate = (date: Date) =>
  moment(date, true).local().format("DD/MM/YYYY HH:mm:ss");
