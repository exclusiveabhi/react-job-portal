import React, { useContext, useState } from "react";
import {Context} from "../../main"
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser  } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import axios from "axios";
import { RiLock2Fill } from "react-icons/ri";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, setisAuthorized, user, setuser } = useContext(Context);

  //user register
  const handleRegister = async (e) => {
    e.preventDefault(); //default refreshing to stop kr diya hai!
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.sucess(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setisAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
return <Navigate to={"/"}></Navigate>
  }
  return <>
 <div className="authPage">
  <div className="container">
    <div className="header">
      <img src="/JobZeelogo.png" alt="logo" />
      <h3>Create a new account</h3>
    </div>
    <form>
      <div className="inputTag">
        <label>Register As</label>
        <div>
          <select value = {role} onChange={(e)=> setRole(e.target.value)}>
            <option value = "">Select Role</option>
            <option value = "Job Seeker">Job Seeker</option>
            <option value = "Employer">Employer</option>
          </select>
          <FaRegUser></FaRegUser>
        </div>
      </div>
      <div className="inputTag">
        <label>Name</label>
        <div>
         <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"/>
         <FaPencilAlt></FaPencilAlt>
        </div>
      </div>
      <div className="inputTag">
        <label>Email Address</label>
        <div>
         <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address"/>
         <MdOutlineMailOutline></MdOutlineMailOutline>
        </div>
      </div>
      <div className="inputTag">
        <label>Phone Number</label>
        <div>
         <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your phone number"/>
         <FaPhoneFlip/>
        </div>
      </div>
      <div className="inputTag">
        <label>Password</label>
        <div>
         <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
         <RiLock2Fill/>
        </div>
      </div>
      <button onClick={handleRegister} type="submit">Register</button>
      <Link to={'/login'}>Login Now</Link>
    </form>
  </div>
  <div className="banner">
    <img src="/register.png" alt="register" />
  </div>
 </div>
  
  </>;
}

export default Register;
