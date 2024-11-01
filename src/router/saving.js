import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "../views/Admin/Dashboard/Dashboard.vue";
import layoutView from '../layout/Layout.vue';
import LoginForm from '../views/Admin/Auth/Loginform.vue';
import Profile from '@/views/Admin/Auth/Profile.vue';
import Staff from '@/views/Admin/Staff/Staff.vue';
import Payroll from '@/views/Admin/Staff/Payroll.vue';
import Role from '@/views/Admin/User/Role.vue';
import Stock from '@/views/Admin/Stock/Stock.vue';
import Position from '@/views/Admin/Staff/Position.vue';
import Branch from '@/views/Admin/Staff/Branch.vue';
import Customer from '@/views/Admin/Agent/Customer.vue';
import Miller from '@/views/Admin/Miller/Miller.vue';
import Agent from '@/views/Admin/Agent/Agent.vue';
import MoneyRice from '@/views/Admin/CollegMoney/MoneyRice.vue';
import CustomerToCollege from '@/views/Admin/CollegMoney/CustomerToCollege.vue';
import CollegeRice from '@/views/Admin/Controll/CollegeRice.vue';
import RealMoneyControll from '@/views/Admin/Controll/RealMoney.vue';
import DataBuyRice from '@/views/Admin/Miller/DataBuyRice.vue';
import User from '@/views/Admin/User/User.vue';
import AddAgent from '@/views/Admin/Agent/action-agent/AddAgent.vue';
import DetailAgent from '@/views/Admin/Agent/action-agent/DetailAgent.vue';
import Order from '@/views/Admin/Order/Order.vue';
import ProvideOrder from '@/views/Admin/Order/Provide.vue';
import AddUser from '@/views/Admin/User/User-Action/AddUser.vue';
import DetailsStaff from '@/views/Admin/Staff/action-staff/DetailsStaff.vue';
import AddStaff from '@/views/Admin/Staff/action-staff/AddStaff.vue';
import DetailsMiller from '@/views/Admin/Miller/action-miller/DetailsMiller.vue';
import AddMiller from '@/views/Admin/Miller/action-miller/AddMiller.vue';
import DetailMonth from '@/views/Admin/Staff/payroll/DetailMonth.vue';
import DetailPersional from '@/views/Admin/Staff/payroll/DetailPersional.vue';
import OrderDetail from '@/views/Admin/Order/action-order/OrderDetail.vue';
import Deduct from '@/views/Admin/Miller/Deduct.vue';
import ProviderAgent from '@/views/Admin/Miller/ProviderAgent.vue';
import ProvideDetail from '@/views/Admin/Order/action-provide/ProvideDetail.vue';
import Add from '@/views/Admin/Order/action-order/Add.vue';
import AddCustomer from '@/views/Admin/Agent/action-customer/Add.vue';
import DetailsByRie from '@/views/Admin/Miller/action-by-rice/Details.vue';
import AddDeduct from '@/views/Admin/Miller/action-deduct/Add.vue';
import DetailsDeduct from '@/views/Admin/Miller/action-deduct/Details.vue';
import AddProviderAgent from '@/views/Admin/Miller/action-provider-agent/Add.vue';
import DetailsProviderAgent from '@/views/Admin/Miller/action-provider-agent/Details.vue';
import AddBuyRice from '@/views/Admin/Miller/action-by-rice/Add.vue';
import AddBenefit from '@/views/Admin/Staff/action-staff/AddBenefit.vue';
import DetailCustomer from '@/views/Admin/Agent/action-customer/Detail.vue';
import StockAgent from '@/views/Admin/Stock/StockAgent.vue';
import StockDeductMiller from '@/views/Admin/Stock/StockDeductMiller.vue';
import RecordProvider from '@/views/Admin/Order/RecordProvider.vue';
import RecordReject from '@/views/Admin/Order/RecordReject.vue';

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/",
    component: layoutView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      // Order and Provide
      {
        path: "order",
        name: "order",
        component: Order,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-order",
        name: "add-order",
        component: Add,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "order-detail/:id",
        name: "order-detail",
        component: OrderDetail,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "provider-order",
        name: "provider-order",
        component: ProvideOrder,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "provider-order-detail/:id",
        name: "provider-order-detail",
        component: ProvideDetail,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "record-provider",
        name: "record-provider",
        component: RecordProvider,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "record-reject",
        name: "record-reject",
        component: RecordReject,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      // ប្រតិបត្តិការប្រមូលលុយ
      {
        path: "colleg-money",
        name: "colleg-money",
        component: MoneyRice,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      
      {
        path: "name-customer-college",
        name: "name-customer-college",
        component: CustomerToCollege,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      
     

      // ត្រួតពិនិត្យ
      {
        path: "college-money-rice",
        name: "college-money-rice",
        component: CollegeRice,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "real-money-controll",
        name: "real-money-controll",
        component: RealMoneyControll,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      // រោងម៉ាស៊ីន
      {
        path: "miller",
        name: "miller",
        component: Miller,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-miller",
        name: "add-miller",
        component: AddMiller,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "miller-detail/:id",
        name: "miller-detail",
        component: DetailsMiller,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },

      {
        path: "add-order-rice",
        name: "add-order-rice",
        component: AddBuyRice,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "prochess-order/:id",
        name: "prochess-order",
        component: DetailsByRie,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "data-buy-rice",
        name: "data-buy-rice",
        component: DataBuyRice,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "deduct-miller",
        name: "deduct-miller",
        component: Deduct,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-deduct",
        name: "add-deduct",
        component:AddDeduct,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "detail-deduct",
        name: "detail-deduct",
        component: DetailsDeduct,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "provider-agent",
        name: "provider-agent",
        component: ProviderAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-provider-agent",
        name: "add-provider-agent",
        component: AddProviderAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "detail-provider-agent",
        name: "detail-provider-agent",
        component: DetailsProviderAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
     
      {
        path: "agent",
        name: "agent",
        component: Agent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "agent-add",
        name: "agent-add",
        component: AddAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "agent-detail/:id",
        name: "agent-detail",
        component: DetailAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "customer",
        name: "customer",
        component: Customer,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-customer",
        name: "add-customer",
        component: AddCustomer,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "customer-detail/:id",
        name: "customer-detail",
        component: DetailCustomer,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      
      // staff management
      {
        path: "staff",
        name: "staff",
        component: Staff,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-staff",
        name: "add-staff",
        component: AddStaff,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "add-benefit",
        name: "add-benefit",
        component: AddBenefit,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },

      {
        path: '/staff/:id',
        name: 'detail-staff',
        component: DetailsStaff ,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      
      // position management
      {
        path: "position",
        name: "position",
        component: Position,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "branch",
        name: "branch",
        component: Branch,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
     
      // Payroll
      {
        path: "payroll",
        name: "payroll",
        component: Payroll,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "payroll-detail-month/:id",
        name: "payroll-detail-month",
        component: DetailMonth,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "payroll-detail-month-persional/:id",
        name: "payroll-detail-month-persional",
        component: DetailPersional,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      
      {
        path: "profile",
        name: "profile",
        component: Profile,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },

      // Stock Modules
      {
        path: "stock",
        name: "stock",
        component: Stock,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "stockDeductfromMiller",
        name: "stockDeductfromMiller",
        component: StockDeductMiller,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "stock-agent",
        name: "stock-agent",
        component: StockAgent,
        // meta: { requiresAuth: true, roles: ['User', 'Admin'] },
      },
      {
        path: "role",
        name: "role",
        component: Role,
        // meta: { requiresAuth: true, roles: [ 'Admin'] },
      },
      // User Module
      {
        path: "user",
        name: "user",
        component: User,
        // meta: { requiresAuth: true, roles: [ 'Admin'] },
      },
      {
        path: "add-user",
        name: "add-user",
        component: AddUser,
        // meta: { requiresAuth: true, roles: [ 'Admin'] },
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // If route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedInUser) {
      // User is not logged in, redirect to login
      next({ name: 'login' });
    } else {
      // Check if the user's role is allowed for this route
      const userRole = loggedInUser.Role;
      const allowedRoles = to.meta.roles;

      if (allowedRoles.includes(userRole)) {
        next(); // User has access, proceed to the route
      } else {
        // User does not have access, redirect to unauthorized page or dashboard
        next({ name: 'dashboard' });
      }
    }
  } else {
    // If the route doesn't require authentication, allow access
    next();
  }
});

export default router;
