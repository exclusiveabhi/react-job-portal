import React from "react";
import { Link } from "react-router-dom"
// import  "../App.css"

function NotFound() {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="notfound.png" alt="notfound"></img>
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  );
}

export default NotFound;
