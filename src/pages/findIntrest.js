import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { getIntrest } from "../helper";
const initialVal = {
    date: "",
    amount: "",
    rate: "",
    eDate: "",
    sDate: "",
};
const FindIntrest = ({ modalIsOpen, closeModal }) => {
    const [modalData, setModalData] = useState(initialVal);
    const [intrestAmt, setIntrestAmt] = useState("");

    const submitData = () => {
        const intrestval = getIntrest(modalData, modalData.eDate);
        setIntrestAmt(intrestval);
    };
    const disableBtn = Object.values(modalData).every((value) => !!value);
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >
            <button
                onClick={() => {
                    closeModal();
                    setModalData(initialVal);
                    setIntrestAmt("");
                }}
            >
                close
            </button>
            <div>Calculate Intrest</div>
            <form>
                Amount:
                <input
                    type="number"
                    onChange={(e) =>
                        setModalData({
                            ...modalData,
                            amount: e.target.value,
                        })
                    }
                />
                Start date:
                <input
                    type="date"
                    onChange={(e) =>
                        setModalData({
                            ...modalData,
                            date: moment(e.target.value).format("DD/MM/YYYY"),
                            sDate: e.target.value,
                        })
                    }
                />
                End date:
                <input
                    type="date"
                    min={modalData.sDate}
                    onChange={(e) =>
                        setModalData({
                            ...modalData,
                            eDate: moment(e.target.value).format("DD/MM/YYYY"),
                        })
                    }
                />
                Rate:
                <input
                    type="number"
                    onChange={(e) =>
                        setModalData({
                            ...modalData,
                            rate: e.target.value,
                        })
                    }
                />
                {intrestAmt && (
                    <>
                        <h1>
                            Intrest:
                            {`${new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format(intrestAmt)}/-`}
                        </h1>
                        <h1>
                            Total:
                            {`${new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format(Number(modalData.amount) + intrestAmt)}/-`}
                        </h1>
                    </>
                )}
                <button
                    type="button"
                    onClick={() => {
                        closeModal();
                        setModalData(initialVal);
                        setIntrestAmt("");
                    }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={!disableBtn}
                    onClick={() => submitData()}
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default FindIntrest;
