import React, {useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Tooltip, TextField, Stack } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useApi } from "../Service/ApiContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDialog = ({ open, handleClose, user, setUser, setUserData }) => {
  const { editData, getData } = useApi();

  const formattedDob = moment(user?.dob).format("MM-DD-YYYY");

  const [date, setDate] = useState(dayjs(`${formattedDob}`));

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewUrl(reader.result);
        const existingImage = document.getElementById("existingImage");
        if (existingImage) {
          existingImage.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      const existingImage = document.getElementById("existingImage");
      if (existingImage) {
        existingImage.src = `http://localhost:5000/uploads/${user?.picture}`;
      }
    }
  };

  const handleEdit = async () => {
    let { name, description, isActive, picture } = user;

    const updatedData = {
      name,
      dob: date,
      isActive,
      description,
      picture: selectedFile || picture,
    };

    try {
      await editData(user._id, updatedData);
      const response = await getData();
      setUserData(response?.data);
      handleClose();
      console.log("Update Data: ", updatedData);
    } catch (error) {
      console.error("Error while updating user data:", error);
    }
  };

  return (
    <>
      <form>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Update User"}</DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <Stack
                spacing={2}
                direction={"column"}
                sx={{
                  margin: "10px",
                  padding: "1rem",
                }}
              >
                <label htmlFor="fileInput" style={{ margin: "0 auto" }}>
                  <Tooltip title="Select Profile Image">
                    <img
                      id="existingImage"
                      src={
                        `http://localhost:5000/uploads/${user?.picture}` ||
                        previewUrl
                      }
                      alt="UploadFiles"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  name="picture"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <TextField
                  placeholder="Enter Your Name"
                  name=""
                  variant="outlined"
                  value={user?.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs(`${formattedDob}`)}
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                  />
                </LocalizationProvider>
                <TextField
                  placeholder="Enter Your Message..."
                  name=""
                  multiline
                  maxRows={5}
                  value={user?.description}
                  onChange={(e) =>
                    setUser({ ...user, description: e.target.value })
                  }
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        color="success"
                        checked={user?.isActive}
                        onChange={(e) =>
                          setUser({ ...user, isActive: e.target.checked })
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="info" onClick={handleEdit}>
              Update
            </Button>
            <Button onClick={handleClose} color="error" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default EditDialog;
