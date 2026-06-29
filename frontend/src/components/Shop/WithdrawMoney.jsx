import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

import { loadSeller } from "../../redux/actions/user";
import { server } from "../../server";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [bankSwiftCode, setBankSwiftCode] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankHolderName, setBankHolderName] = useState("");
  const [bankAddress, setBankAddress] = useState("");

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);

    if (amount < 50) {
      toast.error("Minimum withdraw amount is $50!");
      return;
    }
    if (amount > seller?.availableBalance) {
      toast.error("Withdraw amount exceeds available balance!");
      return;
    }

    try {
      await axios.post(
        `${server}/withdraw/create-withdraw-request`,
        { amount },
        { withCredentials: true }
      );
      toast.success("Withdraw request created successfully!");
      setOpen(false);
      setWithdrawAmount("");
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request!");
    }
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/shop/update-payment-methods`,
        {
          bankName,
          bankCountry,
          bankSwiftCode,
          bankAccountNumber,
          bankHolderName,
          bankAddress,
        },
        { withCredentials: true }
      );
      toast.success("Bank account linked successfully!");
      setPaymentModal(false);
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response?.data?.message || "Linking failed!");
    }
  };

  const handleDeletePaymentMethod = async () => {
    try {
      await axios.delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      });
      toast.success("Withdraw method removed successfully!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed!");
    }
  };

  return (
    <div className="w-full p-4 sm:p-8 flex justify-center">
      <div className="w-[95%] sm:w-[80%] 1000px:w-[50%] bg-white border shadow-sm rounded p-6 text-center space-y-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-3 font-Poppins">
          Payouts Withdraw Summary
        </h3>
        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <h4 className="text-3xl font-extrabold text-emerald-600 mt-2">
            ${seller?.availableBalance ? seller.availableBalance.toFixed(2) : "0.00"}
          </h4>
        </div>

        <button
          onClick={() => setOpen(true)}
          disabled={!seller?.availableBalance || seller.availableBalance < 50}
          className="w-full py-3 bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded font-semibold hover:bg-emerald-700 transition"
        >
          Withdraw Earnings
        </button>

        {/* 1. Withdraw Request Modal */}
        {open && (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] bg-white rounded-md p-6 shadow-md text-left relative">
              <RxCross1
                size={25}
                className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
                onClick={() => setOpen(false)}
              />
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Submit Withdraw Request
              </h4>

              {seller?.withdrawMethod ? (
                <div className="space-y-4">
                  {/* Linked Bank details */}
                  <div className="bg-gray-50 rounded p-4 border border-gray-100 flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold text-gray-800">{seller.withdrawMethod.bankName}</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Holder: {seller.withdrawMethod.bankHolderName}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Account: ****{seller.withdrawMethod.bankAccountNumber?.slice(-4)}
                      </p>
                    </div>
                    <MdDeleteOutline
                      size={22}
                      className="cursor-pointer text-red-500 hover:text-red-700 transition"
                      onClick={handleDeletePaymentMethod}
                      title="Remove method"
                    />
                  </div>

                  <form onSubmit={handleWithdrawSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 pb-1">
                        Withdrawal Amount ($)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="Enter amount (min $50)..."
                        className={`${styles.input} !h-[38px]`}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full h-[40px] bg-emerald-600 text-white rounded-[3px] font-[500] hover:bg-emerald-700 transition"
                    >
                      Submit Cash Out
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <h5 className="text-gray-500 font-[500]">No withdraw methods linked!</h5>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setPaymentModal(true);
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-[3px] font-[500] text-sm transition"
                  >
                    Add Bank Detail Method
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Add Bank Detail Modal */}
        {paymentModal && (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[50%] bg-white rounded-md p-6 shadow-md text-left relative max-h-[85vh] overflow-y-scroll">
              <RxCross1
                size={25}
                className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
                onClick={() => setPaymentModal(false)}
              />
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Add Bank Account Method
              </h4>

              <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                <div className="w-full flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">Bank Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chase Bank"
                      className={`${styles.input} !h-[38px]`}
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">Bank Country</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. USA"
                      className={`${styles.input} !h-[38px]`}
                      value={bankCountry}
                      onChange={(e) => setBankCountry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">SWIFT Code</label>
                    <input
                      type="text"
                      required
                      placeholder="Bank swift code..."
                      className={`${styles.input} !h-[38px]`}
                      value={bankSwiftCode}
                      onChange={(e) => setBankSwiftCode(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">Account Number</label>
                    <input
                      type="text"
                      required
                      placeholder="Account number..."
                      className={`${styles.input} !h-[38px]`}
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">Holder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Beneficiary holder name..."
                      className={`${styles.input} !h-[38px]`}
                      value={bankHolderName}
                      onChange={(e) => setBankHolderName(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 pb-1">Bank Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Bank street address..."
                      className={`${styles.input} !h-[38px]`}
                      value={bankAddress}
                      onChange={(e) => setBankAddress(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
                >
                  Link Bank Details
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawMoney;
