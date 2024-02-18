import React, { useEffect, useState } from "react";
import EditDialog from "./EditDialog";
import { useApi } from "../Service/ApiContext";
import ListItem from "./ListItem";
import TablePagination from "@mui/material/TablePagination";
import { LinearProgress, Box } from "@mui/material";

const UserList = () => {
  const { getData, deleteData } = useApi();
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (user) => {
    setOpen(true);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      const response = await getData();
      setUserData(response?.data);
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getData();
      setUserData(response?.data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Render loading indicator for 3 seconds */}
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {/* Render table only when loading is false */}
      {!loading && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Peofile Image</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData?.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <ListItem
                    handleOpen={() => handleOpen(user)}
                    key={user?._id}
                    user={user}
                    handleDelete={handleDelete}
                  />
                ))}
            </tbody>
          </table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            sx={{ width: "80%" }}
            count={userData?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}

      {/* Render EditDialog component */}
      <EditDialog
        open={open}
        handleClose={handleClose}
        user={selectedUser}
        setUser={setSelectedUser}
        setUserData={setUserData}
      />
    </>
  );
};

export default UserList;
