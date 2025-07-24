import baseApis from "../../baseApis";

const loginApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({data}) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApis;
