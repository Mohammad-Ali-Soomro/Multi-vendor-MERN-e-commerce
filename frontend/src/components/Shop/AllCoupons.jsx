import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { FiTrash } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const AllCoupons = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");

  const fetchCoupons = async () => {
    if (!seller?._id) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/coupon/get-coupon/${seller._id}`,
        { withCredentials: true }
      );
      setCoupons(data.couponCodes || []);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
      fetchCoupons();
    }
  }, [dispatch, seller?._id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      });
      toast.success("Coupon code deleted successfully!");
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete coupon!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !value) {
      toast.error("Please fill all required coupon parameters!");
      return;
    }
    try {
      await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      toast.success("Coupon code created successfully!");
      setOpen(false);
      setName("");
      setValue("");
      setMinAmount("");
      setMaxAmount("");
      setSelectedProducts("");
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create coupon!");
    }
  };

  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Code", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Value", minWidth: 100, flex: 0.6 },
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
  coupons &&
    coupons.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
      });
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8 relative">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h5 className="text-[18px] font-[500] text-gray-800">Discount Coupons</h5>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition"
          >
            Create Coupon Code
          </button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {/* Coupon Modal Toggler */}
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[40%] bg-white rounded-md p-6 shadow-md relative">
            <RxCross1
              size={25}
              className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            />
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Create Coupon Code
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter coupon code name..."
                  className={`${styles.input} !h-[38px]`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Discount Value (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter discount value..."
                  className={`${styles.input} !h-[38px]`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Min Amount</label>
                  <input
                    type="number"
                    placeholder="Min amount..."
                    className={`${styles.input} !h-[38px]`}
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Max Amount</label>
                  <input
                    type="number"
                    placeholder="Max amount..."
                    className={`${styles.input} !h-[38px]`}
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Apply for Product
                </label>
                <select
                  value={selectedProducts}
                  onChange={(e) => setSelectedProducts(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  <option value="">Choose item</option>
                  {products &&
                    products.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
