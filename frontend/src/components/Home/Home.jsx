import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "../Home/HeroSection";
import HowItWorks from "../Home/HowItWorks";
import PopularCategories from "../Home/PopularCategories";
import PopularCompanies from "../Home/PopularCompanies"



function Home() {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return (
    <section className="homePage page">
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <PopularCategories></PopularCategories>
      <PopularCompanies></PopularCompanies>
    </section>
  );
}

export default Home;
