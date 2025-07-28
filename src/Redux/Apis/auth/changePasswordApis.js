import baseApis from "../../baseApis";

const changePasswordApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: ({data}) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
        }),
    })  
});

export const { useChangePasswordMutation } = changePasswordApis;