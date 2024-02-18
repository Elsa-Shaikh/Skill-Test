import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  styled,
  TextField,
  Stack,
} from "@mui/material";
import upload_file_icon from "../Assets/upload.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useApi } from "../Service/ApiContext";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  display: "flex",
  boxSizing: "border-box",
  backgroundColor: "#FFF",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const AddUser = () => {
  const navigate = useNavigate();
  const { addData } = useApi();

  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
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
        existingImage.src = upload_file_icon;
      }
    }
  };
  const handleFormSubmit = async () => {
    const userData = {
      name: username,
      dob: date,
      isActive: checked,
      description,
      picture: selectedFile,
    };

    try {
      await addData(userData);
      navigate("/");
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };
  return (
    <>
      <form>
        <Container>
          <Box sx={{ width: "60%", padding: "1rem" }}>
            <Typography
              variant="h3"
              fontFamily={"sans-serif"}
              fontWeight={"bolder"}
              align="center"
            >
              Create a new User
            </Typography>
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                margin: "30px auto",
                width: "70%",
                padding: "1rem",
              }}
            >
              <TextField
                placeholder="Enter Your Name"
                name="username"
                variant="outlined"
                label="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date of Birth"
                  defaultValue={dayjs("2022-04-17")}
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </LocalizationProvider>
              <TextField
                placeholder="Enter Your Message..."
                multiline
                maxRows={5}
                label="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="success"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Active"
                />
              </FormGroup>
              <Button
                variant="contained"
                color="error"
                onClick={handleFormSubmit}
              >
                Create
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="fileInput">
              <Tooltip title="Select Profile Image">
                <img
                  id="existingImage"
                  src={previewUrl || upload_file_icon}
                  alt="UploadImage"
                  style={{
                    width: "200px",
                    height: "200px",
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
              required
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>
        </Container>
      </form>
    </>
  );
};

export default AddUser;
