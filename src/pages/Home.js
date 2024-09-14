import React from "react";
import Header from "../components/header";
import './home.css';
import SearchField from "../components/home_search";
import Section1 from "../components/section1";
import Section2 from "../components/section2";
import Footer from "../components/footer"
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="homeContainer">
      <Link to='ad-success'>Ad success</Link>
      <div className="backgroundImage"></div>
      <Header />
      <SearchField />
      <Section1 />
      <Section2 />
      <Footer />
    </div>
  );
}
