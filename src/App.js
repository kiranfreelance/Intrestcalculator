import "./App.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
require("moment-precise-range-plugin");
export default function App() {
  const today = moment().format("DD/MM/YYYY");
  const [endDate, setEndDate] = useState(today);
  const [tempArr, setTempArr] = useState([]);

  const [actualList] = useState([
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

  ]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");

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
    return totalIntrest;
  };

  useEffect(() => {
    const borrowIntrest = filteredList.map((item) => {
      return { ...item, intrest: getIntrest(item) };
    });
    setTempArr(borrowIntrest);
  }, [endDate, filteredList]);

  useEffect(() => {
    if (selectedPerson === "") {
      setFilteredList(actualList);
    } else {
      const filteredList = actualList.filter(
        (item) => item.name === selectedPerson
      );
      setFilteredList(filteredList);
    }
  }, [selectedPerson]);

  const actualTotal = filteredList.reduce(function (acc, obj) {
    return acc + obj.amount;
  }, 0);
  const intrestTotal = tempArr.reduce(function (acc, obj) {
    return acc + obj.intrest;
  }, 0);

  const uniqueBarrowers = [...new Set(actualList.map((item) => item.name))];
  return (
    <div className="App">
      End date:
      <input
        type="date"
        onChange={(e) =>
          setEndDate(moment(e.target.value).format("DD/MM/YYYY"))
        }
      />
      Borrower:
      <select onChange={(e) => setSelectedPerson(e.target.value)}>
        <option value={""}>{"Select"}</option>
        {uniqueBarrowers.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <table>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Rate</th>
          <th>Current</th>
        </tr>
        {filteredList.map((item) => {
          return (
            <tr key={item}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>
                {`${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.amount)}/-`}
              </td>
              <td>{item.rate}</td>
              <td>
                {`${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(getIntrest(item))}/-`}
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td>
            <b>
              {`${new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(actualTotal)}/-`}
            </b>
          </td>
          <td></td>
          <td>
            <b>
              {`${new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(intrestTotal)}/-`}
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
