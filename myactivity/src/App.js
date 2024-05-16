import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//import NavBar from './components/NavBar';
import Home from './pages/Home/Home';
import Services from './pages/Services/serve';
import Login from './pages/Login/Login';
import CreateAccount from './pages/Login/CreateAccount';
import ADashboard from './Dashboards/ADashboard/ADashboard';
import routes from './Dashboards/ADashboard/routes'
import CustomerList from './Dashboards/ADashboard/components/CustomerList';
import ServiceProviderList from './Dashboards/ADashboard/components/ServiceProviderList';
import UserProfile from './Dashboards/ADashboard/components/UserProfile';
import ManageUsers from './Dashboards/ADashboard/components/ManageUsers';
import SearchByServiceCategory from './Dashboards/ADashboard/components/SearchByServiceCategory';
import PerformanceEvaluation from './Dashboards/ADashboard/components/PerformanceEvaluation';
import ManageRequests from './Dashboards/ADashboard/components/ManageRequests';
import SDashboard from './Dashboards/SDashboard/SDashboard';
import PerformanceRating from './Dashboards/SDashboard/components/PerformanceRating';
import ViewCustomerInfo from './Dashboards/SDashboard/components/ViewCustomerInfo';
import UserProfiles from './Dashboards/SDashboard/components/UserProfile';
import ChatWithCustomer from './Dashboards/SDashboard/components/ChatWithCustomer';
import ViewSalary from './Dashboards/SDashboard/components/ViewSalary';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/services" element={<Services/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/customer-list" element={<CustomerList/>}/>
          <Route exact path="/service-provider-list" element={<ServiceProviderList/>}/>
          <Route exact path="/user-profile" element={<UserProfile/>}/>
          <Route exact path="/manage-users" element={<ManageUsers/>}/>
          <Route exact path="/search-by-service-category" element={<SearchByServiceCategory/>}/>
          <Route exact path="/performance-evaluation" element={<PerformanceEvaluation/>}/>
          <Route exact path="/manage-requests" element={<ManageRequests/>}/>


          <Route exact path="/user-profiles" element={<UserProfiles/>}/>
          <Route exact path="/view-salary" element={<ViewSalary/>}/>
          <Route exact path="/customer-info" element={<ViewCustomerInfo/>}/>
          <Route exact path="/performance-rating" element={<PerformanceRating/>}/>
          <Route exact path="/chat-with-customer" element={<ChatWithCustomer/>}/>


          <Route exact path="/createAccount" element={<CreateAccount/>}/>
          <Route exact path="/ADashboard" element={<ADashboard/>}/>
          <Route exact path="/SDashboard" element={<SDashboard/>}/>

          {/*routes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
            />
          ))*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

