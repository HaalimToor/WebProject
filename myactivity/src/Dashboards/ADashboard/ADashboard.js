import React from "react";
import Sidebar from "./sidebar";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function ADashboard() {
  return (
    <div className="wrapper">
      <div className="main-panel">
       {/* <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>*/}
      </div>
      <Sidebar routes={routes} />
      
    </div>
  );
}

export default ADashboard;
