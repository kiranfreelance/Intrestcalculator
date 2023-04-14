import React from "react";
import { getIntrest } from "../helper";

export default function BorrowerTable({ filteredList, intrestAmt,endDate }) {
  const actualTotal = filteredList.reduce(function (acc, obj) {
    return acc + obj.amount;
  }, 0);
  const intrestTotal = intrestAmt.reduce(function (acc, obj) {
    return acc + obj.intrest;
  }, 0);
  return (
    <div className="App">
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
                }).format(getIntrest(item,endDate))}/-`}
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
