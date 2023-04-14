import moment from "moment";
require("moment-precise-range-plugin");

export const actualList = [
  { name: "Venkateshulu", date: "23/02/2022", amount: 250000, rate: "2.50" },
  { name: "Venkateshulu", date: "12/06/2022", amount: 100000, rate: "3.00" },
  { name: "Venkateshulu", date: "15/06/2022", amount: 15000, rate: "3.00" },
  { name: "Govindlu", date: "01/11/2021", amount: 100000, rate: "2.00" },
  { name: "Bike", date: "28/11/2021", amount: 200000, rate: "2.00" },
  { name: "Bike", date: "04/12/2021", amount: 50000, rate: "2.00" },
  { name: "Bike", date: "01/08/2022", amount: 100000, rate: "2.50" },
  { name: "Sattibabu", date: "03/11/2022", amount: 60000, rate: "2.50" },
  { name: "Ponamanda", date: "27/02/2023", amount: 200000, rate: "2.50" },
  { name: "Anji", date: "12/09/2022", amount: 100000, rate: "2.00" },
  { name: "Anji", date: "12/09/2022", amount: 6000, rate: "0.00" },
];

export const getIntrest = (item, endDate) => {
  const startDt = moment(item.date, "DD/MM/YYYY");
  const endDt = moment(endDate, "DD/MM/YYYY");
  const dtDiff = moment.preciseDiff(startDt, endDt, true);
  const { years, months, days } = dtDiff;
  const perMonth = item.rate * 1000 * (item.amount / 100000);
  const yearsInt = perMonth * 12 * years;
  const monthsInt = perMonth * months;
  const daysInt = (perMonth / 30) * days;
  const totalIntrest = yearsInt + monthsInt + daysInt;
  return totalIntrest;
};
