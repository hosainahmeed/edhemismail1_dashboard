import baseApis from "../../baseApis";

const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ searchTerm }) => ({
        url: "/normal-user/get-all-user",
        method: "GET",
        params: {
          searchTerm,
        },
      }),
      providesTags: ["users"],
    }),
    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/normal-user/block-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    unblockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/normal-user/unblock-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApis;
