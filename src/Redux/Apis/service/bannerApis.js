import baseApis from "../../baseApis";

const bannerApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: "/banner/get-all-banner",
        method: "GET",
      }),
      providesTags: ["banner"],
      // Add error handling for queries
      transformErrorResponse: (response, meta, arg) => {
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch banners",
          data: response.data,
        };
      },
    }),

    createBanner: builder.mutation({
      query: ({ data }) => ({
        url: "/banner/create-banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
      // Add error handling for mutations
      transformErrorResponse: (response, meta, arg) => {
        return {
          status: response.status,
          message: response.data?.message || "Failed to create banner",
          data: response.data,
        };
      },
      // Optimistic update
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Refetch the data after successful creation
          dispatch(bannerApis.util.invalidateTags(["banner"]));
        } catch (error) {
          console.error("Create banner failed:", error);
        }
      },
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete-banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
      // Add error handling for mutations
      transformErrorResponse: (response, meta, arg) => {
        return {
          status: response.status,
          message: response.data?.message || "Failed to delete banner",
          data: response.data,
        };
      },
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically remove the banner from cache
        const patchResult = dispatch(
          bannerApis.util.updateQueryData("getBanner", undefined, (draft) => {
            if (draft?.data?.result) {
              draft.data.result = draft.data.result.filter(
                (banner) => banner._id !== id
              );
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // Revert the optimistic update if the mutation fails
          patchResult.undo();
          console.error("Delete banner failed:", error);
        }
      },
    }),

    // Optional: Add an endpoint to check upload progress if your backend supports it
    checkUploadStatus: builder.query({
      query: (uploadId) => ({
        url: `/banner/upload-status/${uploadId}`,
        method: "GET",
      }),
      // Don't cache this query
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useCheckUploadStatusQuery,
} = bannerApis;

export default bannerApis;
