import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'http://10.10.11.15:5090';
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({}),
})

export const { useGetPokemonByNameQuery } = baseApi