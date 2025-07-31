import baseApis from "../../baseApis";

const termsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/manage/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ requestData }) => ({
        url: "/manage/add-terms-conditions",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["terms"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} = termsApis;
