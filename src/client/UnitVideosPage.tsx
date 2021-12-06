import React from "react";
import NavigationBar from "./NavigationBar";

export default function UnitVideosPage() {
  return (
    <>
      <NavigationBar />
      <h1>Unit videos</h1>
      <h6>(May take a moment to load)</h6>
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ63c3yfkD0au44VTTSWCU5D_TSEbVU6W2BK8po90rHIzlUXtR5SwyehSl7_0sfoyfd7HHt0m_tQcAe/pubhtml?gid=856256622&amp;single=true&amp;widget=true&amp;headers=false"
        width="100%"
        height="100%"
      ></iframe>
    </>
  );
}
