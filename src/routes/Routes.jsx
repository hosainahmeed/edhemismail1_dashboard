import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../components/layout/main/Dashboard";
import AllUser from "../features/user/ui/AllUser";
import PendingListing from "../features/listing/PendingListing";
import Terms from "../features/setting/Terms";
import PrivacyPolicy from "../features/setting/PrivacyPolicy";
import Profile from "../features/setting/Profile";
import ForgetPassword from "../features/auth/ForgetPassword";
import Login from "../features/auth/Login";
import Support from "../features/support/Support";
import Verification from "../features/auth/Verification";
import ResetPassword from "../features/auth/ResetPassword";
import Category from "../features/category/Category";
import FAQ from "../features/setting/FAQ";
import HomeSlides from "../features/home-slides/HomeSlides";
import FeaturedListings from "../features/listing/FeaturedListings";
import SubCategory from "../features/sub-category/SubCategory";
import ApprovedListings from "../features/listing/ApprovedListings";
import RejectedListings from "../features/listing/RejectedListings";
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/sub-category",
        element: <SubCategory />,
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
