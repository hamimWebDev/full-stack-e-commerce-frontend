import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        getAllCategories: builder.query({
            query: () => '/categories',
            transformResponse: (response: any) => {
                return response?.data;
            }
        }),
    }),
})

export const { useGetAllCategoriesQuery } = categoryApi;
