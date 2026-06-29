import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
import { MdTrackChanges, MdDeleteOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { Country, State } from "country-state-city";

import {
  updateUserInformation,
  updatUserAddress,
  deleteUserAddress,
  loadUser,
} from "../../redux/actions/user";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { server } from "../../server";
import styles from "../../styles/styles";

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const { user, error, successMessage } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-4 sm:p-6 min-h-[70vh]">
      {/* 1. Profile Editing Form */}
      {active === 1 && <ProfileForm user={user} dispatch={dispatch} />}

      {/* 2. All Orders Grid */}
      {active === 2 && <AllOrders user={user} dispatch={dispatch} />}

      {/* 3. All Refund Orders Grid */}
      {active === 3 && <AllRefundOrders user={user} dispatch={dispatch} />}

      {/* 5. Track Order Grid */}
      {active === 5 && <TrackOrdersList user={user} dispatch={dispatch} />}

      {/* 6. Change Password Form */}
      {active === 6 && <ChangePassword />}

      {/* 7. Manage Saved Addresses */}
      {active === 7 && <ManageAddress user={user} dispatch={dispatch} />}
    </div>
  );
};

// Subcomponent: ProfileForm
const ProfileForm = ({ user, dispatch }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        try {
          await axios.put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          );
          toast.success("Avatar updated successfully!");
          dispatch(loadUser());
        } catch (err) {
          toast.error(err.response?.data?.message || "Avatar update failed!");
        }
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-blue-500 shadow-sm"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
              accept="image/*"
            />
            <label htmlFor="image">
              <AiOutlineCamera className="cursor-pointer" size={18} />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto space-y-4">
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className={`${styles.input} !h-[40px] mt-1`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className={`${styles.input} !h-[40px] mt-1 bg-gray-50`}
              required
              readOnly
              value={email}
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              className={`${styles.input} !h-[40px] mt-1`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className={`${styles.input} !h-[40px] mt-1`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm your password to update info"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[40px] border border-blue-600 text-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-[3px] font-[500] transition cursor-pointer"
        >
          Update Profile Information
        </button>
      </form>
    </div>
  );
};

// Subcomponent: AllOrders
const AllOrders = ({ user, dispatch }) => {
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

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
          <Link to={`/user/order/${params.getValue(params.id, "id")}`}>
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
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full pt-1">
      <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">All Orders</h5>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// Subcomponent: AllRefundOrders
const AllRefundOrders = ({ user, dispatch }) => {
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const refundOrders = orders && orders.filter((i) => i.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
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
          <Link to={`/user/order/${params.getValue(params.id, "id")}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];
  refundOrders &&
    refundOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full pt-1">
      <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">Refund Orders</h5>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// Subcomponent: TrackOrdersList
const TrackOrdersList = ({ user, dispatch }) => {
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
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
          <Link to={`/user/track/order/${params.getValue(params.id, "id")}`}>
            <Button>
              <MdTrackChanges size={20} className="text-blue-600" />
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
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full pt-1">
      <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">Track Orders</h5>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

// Subcomponent: ChangePassword
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    try {
      await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed!");
    }
  };

  return (
    <div className="w-full pt-1">
      <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-6">
        Change Password
      </h5>
      <form onSubmit={handlePasswordSubmit} className="max-w-[400px] mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">Old Password</label>
          <input
            type="password"
            required
            className={`${styles.input} !h-[40px]`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">New Password</label>
          <input
            type="password"
            required
            className={`${styles.input} !h-[40px]`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            required
            className={`${styles.input} !h-[40px]`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

// Subcomponent: ManageAddress
const ManageAddress = ({ user, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("");

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!country || !city || !address1 || !zipCode || !addressType) {
      toast.error("Please fill all required address parameters!");
      return;
    }
    dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType));
    setOpen(false);
    setCountry("");
    setCity("");
    setAddress1("");
    setAddress2("");
    setZipCode("");
    setAddressType("");
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full pt-1 relative">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h5 className="text-[18px] font-[500] text-gray-800">Saved Addresses</h5>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-[3px] font-[500] text-sm transition"
        >
          Add New Address
        </button>
      </div>

      {user?.addresses && user.addresses.length !== 0 ? (
        <div className="space-y-3">
          {user.addresses.map((item, index) => (
            <div
              className="w-full bg-gray-50 rounded-md p-4 flex justify-between items-center border border-gray-100"
              key={index}
            >
              <div>
                <h5 className="font-[600] text-gray-800 text-sm md:text-base capitalize">
                  {item.addressType} Address
                </h5>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  {item.address1} {item.address2 ? `, ${item.address2}` : ""}, {item.city},{" "}
                  {item.country}
                </p>
                <p className="text-gray-500 text-xs mt-1">Zip Code: {item.zipCode}</p>
              </div>
              <MdDeleteOutline
                size={22}
                className="cursor-pointer text-red-500 hover:text-red-700 transition"
                onClick={() => handleDeleteAddress(item._id)}
                title="Delete address"
              />
            </div>
          ))}
        </div>
      ) : (
        <h5 className="text-gray-500 text-center py-10 font-[500]">No saved addresses yet!</h5>
      )}

      {/* Address modal overlay */}
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[50%] bg-white rounded-md p-6 shadow-md relative">
            <RxCross1
              size={25}
              className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            />
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Add New Address
            </h4>

            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Choose Country</option>
                    {Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Choose City</option>
                    {country &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Address 1</label>
                  <input
                    type="text"
                    required
                    className={`${styles.input} !h-[38px]`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !h-[38px]`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">Zip Code</label>
                  <input
                    type="number"
                    required
                    className={`${styles.input} !h-[38px]`}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 pb-1">
                    Address Type
                  </label>
                  <select
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Address Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
