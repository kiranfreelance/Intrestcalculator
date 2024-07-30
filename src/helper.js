import moment from "moment";
require("moment-precise-range-plugin");

export const actualList = [
  // { name: "Venkateshulu", date: "23/02/2022", amount: 250000, rate: "0.00", status: false},
  // { name: "Venkateshulu", date: "22/02/2023", amount: 75000, rate: "0.00", status: false },
  // { name: "Venkateshulu", date: "22/02/2023", amount: 325000, rate: "2.50", status: true },
  // { name: "Venkateshulu", date: "12/06/2022", amount: 115000, rate: "3.00", status: true },
  // { name: "Govindlu", date: "01/11/2021", amount: 100000, rate: "2.00", status: true },
  // { name: "Bike", date: "28/11/2021", amount: 200000, rate: "2.00",status:'paid'},
  // { name: "Bike", date: "04/12/2021", amount: 50000, rate: "2.00" ,status:'paid'},
  // { name: "Bike", date: "01/08/2022", amount: 100000, rate: "2.50" ,status:'paid'},
  {
    name: "Raju ZPHS",
    date: "24/07/2024",
    amount: 50000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Raju ZPHS",
    date: "20/07/2024",
    amount: 50000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Nagadevi",
    date: "17/07/2024",
    amount: 10000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Bike",
    date: "11/07/2024",
    amount: 50000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Raju ZPHS",
    date: "17/06/2024",
    amount: 50000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Ramakrishna",
    date: "11/06/2024",
    amount: 100000,
    rate: "2.50",
    status: true,
  },
  {
    name: "Nagadevi",
    date: "05/06/2024",
    amount: 30000,
    rate: "2.00",
    status: true,
  },
  // {
  //   name: "Hanuman",
  //   date: "02/05/2024",
  //   amount: 200000,
  //   rate: "2.50",
  //   status: true,
  // },
  {
    name: "Bike",
    date: "26/03/2024",
    amount: 100000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Durga Rao",
    date: "09/12/2023",
    amount: 100000,
    rate: "3.00",
    status: true,
  },
  // { name: "Bike", date: "28/09/2023", amount: 100000, rate: "2.50", status: true,},
  // { name: "CM", date: "04/09/2023", amount: 500000, rate: "2.00", status: true, },
  // { name: "Hanuman tmpl", date: "29/07/2023", amount: 200000, rate: "2.50", status: true, },
  // { name: "Bike", date: "20/07/2023", amount: 100000, rate: "2.50", status: true, },
  {
    name: "Bike",
    date: "01/04/2023",
    amount: 220000,
    rate: "2.00",
    status: true,
  },
  // { name: "Ponamanda", date: "27/02/2023", amount: 200000, rate: "2.50", status: true, },
  {
    name: "Sattibabu",
    date: "03/11/2022",
    amount: 60000,
    rate: "2.50",
    status: true,
  },
  {
    name: "Anji",
    date: "12/09/2022",
    amount: 100000,
    rate: "2.00",
    status: true,
  },
  {
    name: "Anji",
    date: "12/09/2022",
    amount: 6000,
    rate: "0.00",
    status: true,
  },
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
  console.log("ff", yearsInt, monthsInt, daysInt);

  return totalIntrest;
};
