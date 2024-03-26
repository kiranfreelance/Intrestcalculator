import "../App.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BorrowerTable from "./borrowerTable";
import { actualList, getIntrest } from "../helper";
import FindIntrest from "./findIntrest";
require("moment-precise-range-plugin");

export default function DashBoard() {
  const today = moment().format("DD/MM/YYYY");
  const [endDate, setEndDate] = useState(today);
  const [intrestAmt, setIntrestAmt] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
        const borrowIntrest = filteredList.map((item) => {
      return { ...item, intrest: getIntrest(item, endDate) };
    });
    setIntrestAmt(borrowIntrest);
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

  const uniqueBarrowers = [...new Set(actualList.map((item) => item.name))];
  return (
    <div className="App">
      End date:
      <input
        style={{ height: "30px" }}
        type="date"
        onChange={(e) =>
          setEndDate(moment(e.target.value).format("DD/MM/YYYY"))
        }
      />
      Borrower:
      <select
        onChange={(e) => setSelectedPerson(e.target.value)}
        style={{ height: "30px" }}
      >
        <option value={""}>{"Select"}</option>
        {uniqueBarrowers.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <BorrowerTable
        filteredList={filteredList}
        intrestAmt={intrestAmt}
        endDate={endDate}
      />
      <FindIntrest modalIsOpen={openModal} closeModal={() => setOpenModal(false)} />
      <button onClick={() => setOpenModal(true)}>Try</button>
    </div>
  );
}
