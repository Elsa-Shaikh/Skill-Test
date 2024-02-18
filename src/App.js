import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApiProvider from "./Service/ApiContext";

function App() {
  return (
    <>
      <ApiProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<AddUser />} />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </>
  );
}

export default App;
