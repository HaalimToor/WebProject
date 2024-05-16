import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../routes"
import Sidebar from "../sidebar";
import ADashboard from "../ADashboard";

const CustomerList = () => {
  return (
    <div>
        <Sidebar routes={routes} />
    </div>
  )
}

export default CustomerList
