import React from "react";
import Sidebar from "./sidebar";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PerformanceRating from './components/PerformanceRating';
import ViewCustomerInfo from './components/ViewCustomerInfo';
import UserProfile from './components/UserProfile';
import ChatWithCustomer from './components/ChatWithCustomer';
import ViewSalary from './components/ViewSalary';

function SDashboard() {
  return (
    <>
    <div className="wrapper">
      
      <Sidebar routes={routes} />
      
    </div>
    <div className="main-panel">
   {/* <Routes>
      <Route exact path="/user-profile" element={<UserProfile/>}/>
      <Route exact path="/view-salary" element={<ViewSalary/>}/>
      <Route exact path="'/customer-info" element={<ViewCustomerInfo/>}/>
      <Route exact path="/performance-rating" element={<PerformanceRating/>}/>
      <Route exact path="/chat-with-customer" element={<ChatWithCustomer/>}/>
  </Routes>*/}
   {/* <Routes>
      {routes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>*/}
  </div>
  </>
  );
}

export default SDashboard;
