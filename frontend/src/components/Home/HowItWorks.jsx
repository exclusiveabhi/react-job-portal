import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";


function HowItWorks() {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How CareerConnect Works !</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus></FaUserPlus>
            <p>Create a account</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem corporis perspiciatis iure.
            </p>
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>Find a Job/Post a Job</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem corporis perspiciatis iure.
            </p>
          </div>
          <div className="card">
            <IoMdSend></IoMdSend>
            <p>Apply For Job/Recruit Suitable Candidates</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem corporis perspiciatis iure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
