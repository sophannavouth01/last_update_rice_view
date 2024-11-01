import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Admin/Dashboard/Dashboard.vue";
import layoutView from "../layout/Layout.vue";
import LoginForm from "../views/Admin/Auth/Loginform.vue";
import User from "@/views/Admin/User/User.vue";
import AddUser from "@/views/Admin/User/User-Action/AddUser.vue";
import Branch from "@/views/Admin/Staff/Branch.vue";
import Position from "@/views/Admin/Staff/Position.vue";
import AddBranch from "@/views/Admin/Staff/action-brand/AddBranch.vue";
import EditBranch from "@/views/Admin/Staff/action-brand/EditBranch.vue";
import Staff from "@/views/Admin/Staff/Staff.vue";
import AddStaff from "@/views/Admin/Staff/action-staff/AddStaff.vue";
import DetailsStaff from "@/views/Admin/Staff/action-staff/DetailsStaff.vue";
import EditStaff from "@/views/Admin/Staff/action-staff/EditStaff.vue";
import Miller from "@/views/Admin/Miller/Miller.vue";
import AddMiller from "@/views/Admin/Miller/action-miller/AddMiller.vue";
import DetailsMiller from "@/views/Admin/Miller/action-miller/DetailsMiller.vue";
import AddAgent from "@/views/Admin/Agent/action-agent/AddAgent.vue";
import DetailAgent from "@/views/Admin/Agent/action-agent/DetailAgent.vue";
import Agent from "@/views/Admin/Agent/Agent.vue";
import Customer from "@/views/Admin/Agent/Customer.vue";
import AddCustomer from "@/views/Admin/Agent/action-customer/Add.vue";
import DetailCustomer from "@/views/Admin/Agent/action-customer/Detail.vue";
import EditCustomer from "@/views/Admin/Agent/action-customer/Edit.vue";
import ChangePassword from "@/views/Admin/User/ChangePassword.vue";
import EditUser from "@/views/Admin/User/User-Action/EditUser.vue";
import IncreaseSalary from "@/views/Admin/Staff/IncreaseSalary.vue";
import Payroll from "@/views/Admin/Staff/Payroll.vue";
import DetailPersional from "@/views/Admin/Staff/payroll/DetailPersional.vue";
import DetailsByRie from '@/views/Admin/Miller/action-by-rice/Details.vue';
import AddBuyRice from '@/views/Admin/Miller/action-by-rice/Add.vue';
import DataBuyRice from '@/views/Admin/Miller/DataBuyRice.vue';
import Stock from '@/views/Admin/Stock/Stock.vue';
import StockAgent from '@/views/Admin/Stock/StockAgent.vue';
import StockDeductMiller from '@/views/Admin/Stock/StockDeductMiller.vue';
import Deduct from '@/views/Admin/Miller/Deduct.vue';
import AddDeduct from '@/views/Admin/Miller/action-deduct/Add.vue';
import DetailsDeduct from '@/views/Admin/Miller/action-deduct/Details.vue';
import StockToBranch from "@/views/Admin/Stock/StockToBranch.vue";
import ProvideToBranch from "@/views/Admin/Miller/ProvideToBranch.vue";
import ProviderAgent from '@/views/Admin/Miller/ProviderAgent.vue';
import ProvideToCustomer from "@/views/Admin/Order/ProvideToCustomer.vue";
import Order from '@/views/Admin/Order/Order.vue';
import ProvideOrder from '@/views/Admin/Order/Provide.vue';
import OrderDetail from '@/views/Admin/Order/action-order/OrderDetail.vue';
import ProvideDetail from '@/views/Admin/Order/action-provide/ProvideDetail.vue';
import Add from '@/views/Admin/Order/action-order/Add.vue';
import RecordProvider from '@/views/Admin/Order/RecordProvider.vue';
import RecordReject from '@/views/Admin/Order/RecordReject.vue';
import MoneyRice from '@/views/Admin/CollegMoney/MoneyRice.vue';
import CustomerToCollege from '@/views/Admin/CollegMoney/CustomerToCollege.vue';
import ForgotPassword from "@/views/Admin/Auth/ForgotPassword.vue";
import Role from "@/views/Admin/User/Role.vue";
import Profile from '@/views/Admin/Auth/Profile.vue';

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/",
    component: layoutView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      // agent
      {
        path: "agent",
        name: "agent",
        component: Agent,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      {
        path: "agent-add",
        name: "agent-add",
        component: AddAgent,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      {
        path: "agent-detail/:id",
        name: "agent-detail",
        component: DetailAgent,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      // customer
      {
        path: "customer",
        name: "customer",
        component: Customer,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      {
        path: "add-customer",
        name: "add-customer",
        component: AddCustomer,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "customer-detail/:id",
        name: "customer-detail",
        component: DetailCustomer,
        meta: {
          requiresAuth: true,
          roles: ["User", "Admin", "Master Admin", "នាយកប្រតិបត្តិ"],
        },
      },
      {
        path: "customer-edit/:id",
        name: "customer-edit",
        component: EditCustomer,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },

      // position management
      {
        path: "position",
        name: "position",
        component: Position,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      // branch management
      {
        path: "branch",
        name: "branch",
        component: Branch,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-branch",
        name: "add-branch",
        component: AddBranch,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "edit-branch/:id",
        name: "edit-branch",
        component: EditBranch,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      // staff management
      {
        path: "staff",
        name: "staff",
        component: Staff,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-staff",
        name: "add-staff",
        component: AddStaff,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "/staff/:id",
        name: "detail-staff",
        component: DetailsStaff,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },

      {
        path: "/edit-staff/:id",
        name: "edit-staff",
        component: EditStaff,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "/increase-Salary",
        name: "increase-Salary",
        component: IncreaseSalary,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },

      // រោងម៉ាស៊ីន
      {
        path: "miller",
        name: "miller",
        component: Miller,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-miller",
        name: "add-miller",
        component: AddMiller,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "miller-detail/:id",
        name: "miller-detail",
        component: DetailsMiller,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-order-rice",
        name: "add-order-rice",
        component: AddBuyRice,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "prochess-order/:id",
        name: "prochess-order",
        component: DetailsByRie,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "data-buy-rice",
        name: "data-buy-rice",
        component: DataBuyRice,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
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
      //deduct from miller
      {
        path: "deduct-miller",
        name: "deduct-miller",
        component: Deduct,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-deduct",
        name: "add-deduct",
        component:AddDeduct,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "detail-deduct",
        name: "detail-deduct",
        component: DetailsDeduct,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "provider-branch",
        name: "provider-branch",
        component: ProvideToBranch,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "provider-agent",
        name: "provider-agent",
        component: ProviderAgent,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "provide-customer",
        name: "provide-customer",
        component: ProvideToCustomer,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
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
      
      // Payroll
      {
        path: "payroll",
        name: "payroll",
        component: Payroll,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "payroll-detail-month-persional/:id",
        name: "payroll-detail-month-persional",
        component: DetailPersional,
        meta: { requiresAuth: true, roles: ["User", "Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      //stock 
      {
        path: "stock",
        name: "stock",
        component: Stock,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "stockDeductfromMiller",
        name: "stockDeductfromMiller",
        component: StockDeductMiller,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "stockToBranch",
        name: "stockToBranch",
        component: StockToBranch,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "stock-agent",
        name: "stock-agent",
        component: StockAgent,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      // User Module
      {
        path: "user",
        name: "user",
        component: User,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "add-user",
        name: "add-user",
        component: AddUser,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "edit-user/:id",
        name: "edit-user",
        component: EditUser,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "role",
        name: "role",
        component: Role,
        meta: { requiresAuth: true, roles: ["Master Admin"] },
      },
      {
        path: "change-password",
        name: "change-password",
        component: ChangePassword,
        meta: { requiresAuth: true, roles: ["Admin", "Master Admin","នាយកប្រតិបត្តិ"] },
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Token expiration check
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
    next({ name: "login" }); // Token expired, redirect to login
    return;
  }

  // If route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedInUser) {
      // User is not logged in, redirect to login
      next({ name: "login" });
    } else {
      const userRoles = loggedInUser.roles || [];
      const allowedRoles = to.meta.roles;

      if (userRoles.some((role) => allowedRoles.includes(role))) {
        next();
      } else {
        next({ name: "dashboard" });
      }
    }
  } else {
    next();
  }
});

export default router;
