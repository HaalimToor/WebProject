import CustomerList from './components/CustomerList';
import ServiceProviderList from './components/ServiceProviderList';
import UserProfile from './components/UserProfile';
import ManageUsers from './components/ManageUsers';
import SearchByServiceCategory from './components/SearchByServiceCategory';
import PerformanceEvaluation from './components/PerformanceEvaluation';
import ManageRequests from './components/ManageRequests';

const routes = [
  {
    path: '/customer-list',
    name: 'View Customers',
    component: CustomerList,
    icon: 'fa fa-users',
    layout: '/ADashboard' // This determines the base URL for the route
  },
  {
    path: '/service-provider-list',
    name: 'View Service Providers',
    component: ServiceProviderList,
    icon: 'fa fa-handshake-o',
    layout: '/ADashboard'
  },
  {
    path: '/user-profile',
    name: 'Profile',
    component: UserProfile,
    icon: 'fa fa-user',
    layout: '/ADashboard'
  },
  {
    path: '/manage-users',
    name: 'Manage Users',
    component: ManageUsers,
    icon: 'fa fa-cogs',
    layout: '/ADashboard'
  },
  {
    path: '/search-by-service-category',
    name: 'View Categories',
    component: SearchByServiceCategory,
    icon: 'fa fa-search',
    layout: '/ADashboard'
  },
  {
    path: '/performance-evaluation',
    name: 'Performance Evaluation',
    component: PerformanceEvaluation,
    icon: 'fa fa-line-chart',
    layout: '/ADashboard'
  },
  {
    path: '/manage-requests',
    name: 'Manage Requests',
    component: ManageRequests,
    icon: 'fa fa-tasks',
    layout: '/ADashboard'
  }
];

export default routes;
