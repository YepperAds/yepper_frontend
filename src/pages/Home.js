import React from "react";
import Header from "../components/header";
import './home.css';
import SearchField from "../components/home_search";
import Section1 from "../components/section1";

export default function Home() {
  return (
    <div className="homeContainer">
      <div className="backgroundImage"></div>
      <Header />
      <SearchField />
      <Section1 />
    </div>
  );
}
