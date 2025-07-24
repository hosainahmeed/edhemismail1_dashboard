import baseApis from "../baseApis";


const profileApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getProfileData: build.query({
            query: () => ({
                url: "/user/get-my-profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetProfileDataQuery } = profileApis;
