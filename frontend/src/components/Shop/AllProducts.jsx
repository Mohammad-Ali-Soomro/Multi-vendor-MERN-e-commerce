import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineEye } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";

import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      toast.success("Product deleted successfully!");
      if (seller?._id) {
        dispatch(getAllProductsShop(seller._id));
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete product!");
    }
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "Stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", type: "number", minWidth: 100, flex: 0.6 },
    {
      field: "preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.getValue(params.id, "id")}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.getValue(params.id, "id"))}>
            <FiTrash size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "$" + (item.discountPrice || item.originalPrice),
        Stock: item.stock,
        sold: item.sold_out || 0,
      });
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">All Products</h5>
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

export default AllProducts;
