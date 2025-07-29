import baseApis from "../../baseApis";

const adminApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: ({ searchTerm, page, limit }) => ({
        url: "/admin/all-admins",
        method: "GET",
        params: {
          searchTerm,
          page,
          limit,
        },
      }),
      providesTags: ["Admins"],
    }),
    createAdmin: build.mutation({
      query: ({ data }) => ({
        url: "/admin/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update-admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: build.mutation({
      query: ({ id }) => ({
        url: `/admin/delete-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApis;
