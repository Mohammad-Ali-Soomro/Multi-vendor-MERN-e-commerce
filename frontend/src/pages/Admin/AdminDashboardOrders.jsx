import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../../components/Layout/Loader";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

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

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          {adminOrderLoading ? (
            <Loader />
          ) : (
            <div className="w-full p-4 sm:p-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">
                  All Orders
                </h5>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
