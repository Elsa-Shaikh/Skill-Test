import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Stack spacing={2} direction={"row"} sx={{}}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            {"Home |"}{" "}
          </Link>
          <Link
            to="/create"
            style={{
              textDecoration: "none",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            {"Add"}{" "}
          </Link>
        </Stack>
      </div>
    </nav>
  );
};

export default Navbar;
