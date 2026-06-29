import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";

import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

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
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-4 sm:p-8 space-y-8">
      <h3 className="text-[22px] font-[600] text-gray-800 font-Poppins">Overview Dashboard</h3>
      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Balance */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">Account Balance</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              ${seller?.availableBalance ? seller.availableBalance.toFixed(2) : "0.00"}
            </h4>
            <p className="text-xs text-gray-400 mt-1">* 10% platform service fee applies</p>
          </div>
          <Link
            to="/dashboard-withdraw-money"
            className="text-blue-600 hover:underline text-sm font-semibold mt-2 block"
          >
            Withdraw Money
          </Link>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">All Orders</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              {orders ? orders.length : 0}
            </h4>
          </div>
          <Link
            to="/dashboard-orders"
            className="text-blue-600 hover:underline text-sm font-semibold mt-2 block"
          >
            View Orders
          </Link>
        </div>

        {/* Card 3: Products */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between h-[150px]">
          <div>
            <h5 className="text-[16px] font-[500] text-gray-400">All Products</h5>
            <h4 className="text-[25px] font-[600] text-gray-800 mt-1">
              {products ? products.length : 0}
            </h4>
          </div>
          <Link
            to="/dashboard-products"
            className="text-blue-600 hover:underline text-sm font-semibold mt-2 block"
          >
            View Products
          </Link>
        </div>
      </div>

      {/* Latest Orders Grid */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">Latest Orders</h5>
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

export default DashboardHero;
