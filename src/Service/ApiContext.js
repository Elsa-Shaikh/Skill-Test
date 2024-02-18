import axios from "axios";
import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);
const url = "http://localhost:5000/api";
const ApiProvider = ({ children }) => {
  const addData = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`${url}/create`, formData, config);
    } catch (error) {
      console.error("Error while creating user:", error);
      throw error;
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/getUser`);
      return response;
    } catch (error) {
      console.error("Error fetching user data!", error);
    }
  };

  const editData = async (id, data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`${url}/edit/${id}`, formData, config);
    } catch (error) {
      console.error("Error while updating user!", error);
      throw error;
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${url}/delete/${id}`);
    } catch (error) {
      console.error("Error while deleting user!", error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ addData, editData, getData, deleteData }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
