import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../routes"
import Sidebar from "../sidebar";
const SearchByServiceCategory = () => {
  return (
    <div>
        <Sidebar routes={routes} />
    </div>
  )
}

export default SearchByServiceCategory
