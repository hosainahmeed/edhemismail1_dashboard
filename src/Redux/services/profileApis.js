import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfileData: build.mutation({
      query: ({ data }) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileDataMutation } =
  profileApis;
