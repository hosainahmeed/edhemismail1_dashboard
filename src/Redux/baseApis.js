import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://10.10.11.15:5090";
const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
  }),
  tagTypes: ["Categories", "SubCategories"],
  endpoints: () => ({}),
});

export default baseApis;
