import { baseApi } from '../baseApis';

const categoryApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: ({ parentCategory, limit, page }) => ({
        url: 'category/all-categories',
        method: 'GET',
        params: {
          parentCategory,
          limit,
          page
        },
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApis;
