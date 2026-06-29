import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";

import { getAllOrdersOfShop } from "../../redux/actions/order";
import Loader from "../Layout/Loader";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">All Orders</h5>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AllOrders;
