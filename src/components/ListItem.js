import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Typography } from "@mui/material";
import moment from "moment";

const ListItem = ({ handleOpen, user, handleDelete }) => {
  const formattedDob = moment(user?.dob).format("MM-DD-YYYY");
  const formattedCreatedAt = moment(user?.createdAt).format("MM-DD-YYYY");

  return (
    <>
      <tr>
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="Profile Avatar"
            src={`http://localhost:5000/uploads/${user?.picture}`}
            sx={{ margin: "5px" }}
          />
        </td>
        <td>
          {" "}
          <Typography>{user?.name}</Typography>
        </td>
        <td>
          {" "}
          <Typography>{formattedDob}</Typography>
        </td>
        <td>
          {" "}
          <Typography>{formattedCreatedAt}</Typography>
        </td>
        <td>
          {" "}
          <span className={`${user?.isActive ? "active" : "off"}`}>
            {user.isActive ? "Active" : "Offline"}
          </span>
        </td>
        <td>
          <EditIcon
            color="info"
            sx={{ cursor: "pointer", marginRight: "10px" }}
            onClick={handleOpen}
          />
          <DeleteIcon
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDelete(user?._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default ListItem;
