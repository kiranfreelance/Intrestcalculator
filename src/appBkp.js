import "./App.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
require("moment-precise-range-plugin");
export default function App() {
  const today = moment().format("DD/MM/YYYY");
  const [endDate, setEndDate] = useState(today);
  // const [endDate, setEndDate] = useState(moment(today, "DD-MM-YYYY"));
  // const [endDate,setEndDate] = useState(moment('01-04-2023', "DD-MM-YYYY"));
  const [tempArr, setTempArr] = useState([]);

  const [borrow] = useState([
    { name: "Venkatesh", date: "23/02/2022", amount: 250000, rate: "2.50" },
    { name: "Venkatesh", date: "12/06/2022", amount: 100000, rate: "3.00" },
    { name: "Venkatesh", date: "15/06/2022", amount: 15000, rate: "3.00" },
    { name: "Venkatesh", date: "12/04/2023", amount: 250000, rate: "2.50" },
  ]);

  // const getIntrest = (item) => {
  //   const startDate = moment(item.date, "DD-MM-YYYY");
  //   const numberOfDays = moment.duration(endDate.diff(startDate)).asDays();
  //   const intrestAmt =
  //     ((item.rate * 1000 * (item.amount / 100000)) / 30) * numberOfDays;
  //   // (((item.rate * 12)/100/365)*numberOfDays)*item.amount
  //   // (item.amount * (item.rate * 12) * (numberOfDays / 365)) / 100;
  //   // console.log("intrestAmt", (item.rate * 1000) * (item.amount / 100000), ((item.rate * 1000) * (item.amount / 100000)) / 30);

  //   const perYear = item.rate * 1000 * (item.amount / 100000);
  //   const years = Math.floor(numberOfDays / 365);
  //   const months = Math.floor((numberOfDays % 365) / 30);
  //   const days = Math.floor((numberOfDays % 365) % 30);
  //   console.log("perYear", years, months, days);

  //   const yearCost = perYear * (years * 12);
  //   const monthCost = perYear * months;
  //   const dayCost = (monthCost / 30) * days;

  //   console.log("yearCost", yearCost + monthCost + dayCost, numberOfDays);

  //   // console.log("intrestAmt", ((perYear * (years*12))+(perYear / 12) * months+ (perYear / 30) * days)*item.rate);

  //   // 100000 2500
  //   // return Math.round(intrestAmt)
  //   return Math.round(yearCost + monthCost + dayCost);
  // };

  const getIntrest = (item) => {
    const startDt = moment(item.date, "DD/MM/YYYY");
    const endDt = moment(endDate, "DD/MM/YYYY");
    const dtDiff = moment.preciseDiff(startDt, endDt, true);
    const { years, months, days } = dtDiff;
    const perMonth = item.rate * 1000 * (item.amount / 100000);
    const yearsInt = perMonth * 12 * years;
    const monthsInt = perMonth * months;
    const daysInt = (perMonth / 30) * days;
    const totalIntrest = yearsInt + monthsInt + daysInt;
    return Math.round(totalIntrest);
  };

  useEffect(() => {
    const borrowIntrest = borrow.map((item) => {
      return { ...item, intrest: getIntrest(item) };
    });
    setTempArr(borrowIntrest);
  }, [endDate]);

  const actualTotal = borrow.reduce(function (acc, obj) {
    return acc + obj.amount;
  }, 0);
  const intrestTotal = tempArr.reduce(function (acc, obj) {
    return acc + obj.intrest;
  }, 0);
  console.log("endDate", endDate);
  return (
    <div className="App">
      <input
        type="date"
        onChange={(e) =>
          setEndDate(moment(e.target.value).format("DD/MM/YYYY"))
        }
      />
      <table>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Rate</th>
          <th>Current</th>
        </tr>
        {borrow.map((item) => {
          return (
            <tr key={item}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.amount)}{" "}
                /-
              </td>
              <td>{item.rate}</td>
              <td>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(getIntrest(item))}{" "}
                /-
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>
            <b>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(actualTotal)}{" "}
              /-
            </b>
          </td>
          <td></td>
          <td></td>
          <td>
            <b>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(intrestTotal)}{" "}
              /-
            </b>
          </td>
        </tr>
      </table>
      <h1>
        Total:{" "}
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(actualTotal + intrestTotal)}{" "}
        /-
      </h1>
    </div>
  );
}
