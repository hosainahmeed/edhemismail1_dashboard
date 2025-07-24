import baseApi from "../../baseApis";

const categoryApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/category/all-categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getSubCategories: build.query({
      query: ({ id }) => ({
        url: `/category/all-categories`,
        method: "GET",
        params: {
          parentCategory: id,
        },
      }),
      providesTags: ["SubCategories"],
    }),
    createCategory: build.mutation({
      query: ({ data }) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories", "SubCategories"],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories", "SubCategories"],
    }),
    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories", "SubCategories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApis;
