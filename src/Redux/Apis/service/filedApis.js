import baseApis from "../../baseApis";

const fieldApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getFields: build.query({
      query: (id) => ({
        url: `/fields/get/${id}`,
        method: "GET",
      }),
      providesTags: ["Fields"],
    }),
    createField: build.mutation({
      query: ({ data, id }) => ({
        url: `/fields/create/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fields"],
    }),
  }),
});

export const { useCreateFieldMutation, useGetFieldsQuery } = fieldApis;
