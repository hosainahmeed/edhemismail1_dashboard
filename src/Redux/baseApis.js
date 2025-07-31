import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../utils/server";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
  }),
  tagTypes: [
    "Categories",
    "SubCategories",
    "terms",
    "privacyPolicy",
    "Profile",
    "users",
    "banner",
  ],
  endpoints: () => ({}),
});

export default baseApis;
