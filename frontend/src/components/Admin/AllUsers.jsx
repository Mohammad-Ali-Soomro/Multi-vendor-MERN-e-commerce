import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { FiTrash } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

import { getAllUsers } from "../../redux/actions/user";
import { server } from "../../server";
import Loader from "../Layout/Loader";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success("User account deleted successfully!");
      setOpen(false);
      dispatch(getAllUsers());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user!");
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.8 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1.0 },
    { field: "email", headerName: "Email", minWidth: 180, flex: 1.2 },
    { field: "role", headerName: "User Role", minWidth: 130, flex: 0.8 },
    { field: "joinedAt", headerName: "Joined At", minWidth: 130, flex: 0.8 },
    {
      field: "delete",
      flex: 0.7,
      minWidth: 100,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setUserId(params.getValue(params.id, "id"));
              setOpen(true);
            }}
          >
            <FiTrash size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt ? item.createdAt.slice(0, 10) : "",
      });
    });

  if (usersLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 sm:p-8 relative">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">All Users</h5>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[35%] bg-white rounded-md p-6 shadow-md text-center relative">
            <RxCross1
              size={22}
              className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Confirm Delete</h4>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this user account? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-semibold text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(userId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold text-sm transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
