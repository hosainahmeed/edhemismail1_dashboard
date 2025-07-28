import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../components/layout/main/Dashboard";
import ForgetPassword from "../features/auth/ForgetPassword";
import Login from "../features/auth/Login";
import ResetPassword from "../features/auth/ResetPassword";
import Verification from "../features/auth/Verification";
import Category from "../features/category/Category";
import DynamicCategory from '../features/category/DynamicCategory';
import HomeSlides from "../features/home-slides/HomeSlides";
import ApprovedListings from "../features/listing/ApprovedListings";
import FeaturedListings from "../features/listing/FeaturedListings";
import PendingListing from "../features/listing/PendingListing";
import RejectedListings from "../features/listing/RejectedListings";
import FAQ from "../features/setting/FAQ";
import PrivacyPolicy from "../features/setting/PrivacyPolicy";
import Profile from "../features/setting/Profile";
import Terms from "../features/setting/Terms";
import Support from "../features/support/Support";
import AllUser from "../features/user/ui/AllUser";
import PrivateRoute from "./PrivetRoute";
import ManageAdmin from "../features/user/ui/ManageAdmin";
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/user/all-user",
        element: <AllUser />,
      },
      {
        path: "/manage-admin",
        element: <ManageAdmin />,
      },
      {
        path: "/home-slides",
        element: <HomeSlides />,
      },
      {
        path: "/pending-listings",
        element: <PendingListing />,
      },
      {
        path: "/approved-listings",
        element: <ApprovedListings />,
      },
      {
        path: "/rejected-listings",
        element: <RejectedListings />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/dynamic-category/:categoryId",
        element: <DynamicCategory />,
      },
      {
        path: "/featured-listings",
        element: <FeaturedListings />,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <Terms />,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/Settings/faq",
        element: <FAQ />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/auth/varification",
    element: <Verification />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
]);
