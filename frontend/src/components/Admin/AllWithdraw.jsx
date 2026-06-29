import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

import { server } from "../../server";
import Loader from "../Layout/Loader";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState(null);
  const [withdrawStatus, setWithdrawStatus] = useState("");

  const fetchWithdrawRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${server}/withdraw/get-all-withdraw-request`,
        { withCredentials: true }
      );
      setData(response.data.withdraws || []);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawStatus) {
      toast.error("Please choose a status!");
      return;
    }
    try {
      await axios.put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      );
      toast.success("Withdraw request updated successfully!");
      setOpen(false);
      fetchWithdrawRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update request!");
    }
  };

  const columns = [
    { field: "id", headerName: "Withdraw ID", minWidth: 150, flex: 0.8 },
    { field: "shopName", headerName: "Shop Name", minWidth: 150, flex: 1.0 },
    { field: "shopId", headerName: "Shop ID", minWidth: 150, flex: 0.8 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 100, flex: 0.6 },
    { field: "status", headerName: "Status", minWidth: 120, flex: 0.7 },
    { field: "createdAt", headerName: "Request given at", minWidth: 130, flex: 0.8 },
    {
      field: "action",
      flex: 0.6,
      minWidth: 100,
      headerName: "Update Status",
      sortable: false,
      renderCell: (params) => {
        const isProcessing = params.getValue(params.id, "status") === "Processing";
        return (
          <>
            {isProcessing && (
              <Button
                onClick={() => {
                  setWithdrawData(params.row);
                  setWithdrawStatus(params.row.status);
                  setOpen(true);
                }}
              >
                <BsPencil size={18} />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const rows = [];
  data &&
    data.forEach((item) => {
      rows.push({
        id: item._id,
        shopName: item.seller?.name || "N/A",
        shopId: item.seller?._id || "N/A",
        amount: "$" + item.amount,
        status: item.status,
        createdAt: item.createdAt ? item.createdAt.slice(0, 10) : "",
      });
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8 relative">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">Withdraw Requests</h5>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {/* Edit Status Modal */}
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[35%] bg-white rounded-md p-6 shadow-md text-left relative">
            <RxCross1
              size={22}
              className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            />
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Update Withdraw Status
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Choose Status
                </label>
                <select
                  value={withdrawStatus}
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  <option value="Processing">Processing</option>
                  <option value="Succeed">Succeed</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
              >
                Update Status
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
