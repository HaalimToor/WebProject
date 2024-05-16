import PerformanceRating from './components/PerformanceRating';
import ViewCustomerInfo from './components/ViewCustomerInfo';
import UserProfiles from './components/UserProfile';
import ChatWithCustomer from './components/ChatWithCustomer';
import ViewSalary from './components/ViewSalary';

const routes = [
  {
    path: '/performance-rating',
    name: 'Performance Rating',
    component: PerformanceRating,
    icon: 'fa fa-star',
    layout: '/SDashboard'
  },
  {
    path: '/customer-info',
    name: 'View Customer Info',
    component: ViewCustomerInfo,
    icon: 'fa fa-users',
    layout: '/SDashboard'
  },
  {
    path: '/user-profiles',
    name: 'Profile',
    component: UserProfiles,
    icon: 'fa fa-user',
    layout: '/SDashboard'
  },
  {
    path: '/chat-with-customer',
    name: 'Chat with Customer',
    component: ChatWithCustomer,
    icon: 'fa fa-comments',
    layout: '/SDashboard'
  },
  {
    path: '/view-salary',
    name: 'View Salary',
    component: ViewSalary,
    icon: 'fa fa-money',
    layout: '/SDashboard'
  },
  
];

export default routes;
