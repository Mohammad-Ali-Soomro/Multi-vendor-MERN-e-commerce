import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { getAllSellers } from "../../redux/actions/sellers";
import Loader from "../Layout/Loader";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  const adminEarning = adminOrders
    ? adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0).toFixed(2)
    : "0.00";

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600 font-semibold"
          : "text-red-500 font-semibold";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "$" + item.totalPrice,
        status: item.status,
        createdAt: item.createdAt ? item.createdAt.slice(0, 10) : "",
      });
    });

  if (adminOrderLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-8">
      <h3 className="text-[22px] font-[600] text-gray-800 font-Poppins">Admin Overview</h3>
      
      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Earning */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">Total Earnings</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              ${adminEarning}
            </h4>
            <p className="text-xs text-gray-400 mt-1">* 10% platform service fee</p>
          </div>
        </div>

        {/* Card 2: Sellers */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">All Sellers</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              {sellers ? sellers.length : 0}
            </h4>
          </div>
          <Link
            to="/admin-sellers"
            className="text-blue-600 hover:underline text-sm font-semibold mt-2 block"
          >
            View Sellers
          </Link>
        </div>

        {/* Card 3: Orders */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">All Orders</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              {adminOrders ? adminOrders.length : 0}
            </h4>
          </div>
          <Link
            to="/admin-orders"
            className="text-blue-600 hover:underline text-sm font-semibold mt-2 block"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Latest Orders Grid */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">Latest Invoices</h5>
        <DataGrid
          rows={rows.slice(0, 5)}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AdminDashboardMain;
