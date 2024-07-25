import React, { useEffect, useContext } from "react"; //createContext mai jo value main.jsx se provide kri hai wo yaha cath ki hai!
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //route import here!
import Login from "../src/components/Auth/Login";
import Register from "../src/components/Auth/Register";
import Navbar from "../src/components/Layout/Navbar";
import Footer from "../src/components/Layout/Footer";
import Home from "../src/components/Home/Home";
import Jobs from "../src/components/Job/Jobs";
import JobDetails from "../src/components/Job/JobDetails";
import PostJob from "../src/components/Job/PostJob";
import MyJobs from "../src/components/Job/MyJobs";
import Application from "./components/Application/Application";
import MyApplication from "./components/Application/MyApplication";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthorized, setisAuthorized, setuser } = useContext(Context); //yeh context se get kr liyee!

  (useEffect = () => {
    const fetchUser = async () => {
      try {
        const response = axios.get("", { withCredentials: true });
        setuser(response.data.user); //response mai se user nikal liya!
        setisAuthorized(true);
      } catch (error) {
        setisAuthorized(false);
      }
    };
    fetchUser();
  }),
    [isAuthorized]; //jb isAuthorized ki value change ho to toh!

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/job/getall" element={<Jobs></Jobs>}></Route>
          <Route path="/job/:id" element={<JobDetails></JobDetails>}></Route>
          <Route path="/job/post" element={<PostJob></PostJob>}></Route>
          <Route path="/job/me" element={<MyJobs></MyJobs>}></Route>
          <Route
            path="/application/:id"
            element={<Application></Application>}
          ></Route>
          <Route
            path="/application/me"
            element={<MyApplication></MyApplication>}
          ></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>{" "}
          {/* (*) ka mtlb hai agar define path me se path na mile toh notfound page show kr do!*/}
        </Routes>
        <Footer></Footer>
        <Toaster></Toaster>
      </Router>
    </>
  );
}

export default App;
