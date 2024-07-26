import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {GiHamburgerMenu} from "react-icons/gi"
function Navbar() {
  const [show, setShow] = useState(false);
  const { isAuthorized, setisAuthorized, user } = useContext(Context); //main mai se context nikal liya!
  const navigateTo = useNavigate(); //logout ke baad kha pr navigate krna hai!

  //for logout
  const handleLogout = async () => {
    //=async()=> async arrow function!
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/logout", {withCredentials: true})
      toast.success(response.data.message)
      setisAuthorized(false)
      navigateTo("/login")
    } catch (error){
      toast.error(error.response.data.message)
      setisAuthorized(true) //agar logout mai error hai toh login hai user!
    }
  };
  return <>
  <nav className={isAuthorized ? "navbarShow" : "navbarHide"}></nav> {/* agar user auth hai toh nav show kro!*/}
  <div className="container">
    <div className="logo">
      <img src="JobZee-logos__white.png" alt="logo" />
    </div>
    <ul className= {!show ? "menu" : "show-menu menu"}>
      <li>
        <Link to={"/"} onClick={()=>setShow(false)}>Home</Link>
      </li>
      <li>
        <Link to={"/job/getall"} onClick={()=>setShow(false)}>All Jobs</Link>
      </li>
      <li>
        <Link to={"/application/me"} onClick={()=>setShow(false)}>
        {
          user && user.role === "Employer" ? "APPLICANT'S APPLICTAIONS" : "MY APPLICATIONS"
        }
        </Link>
      </li>
      {
        user && user.role === "Employer" ? (
          <>
          <li>
            <Link to={"/job/post"} onClick={()=>setShow(false)}>Post Job</Link>
          </li>
          <li>
            <Link to={"/job/me"} onClick={()=>setShow(false)}>View Jobs</Link>
          </li>
          </>
        ): <></>
      }
      <button onClick={handleLogout}>Logout</button>
    </ul>
    <div className="hamburger">
      <GiHamburgerMenu onClick={()=> setShow(!show)}></GiHamburgerMenu>
    </div>
  </div>
  </>;
}

export default Navbar;
