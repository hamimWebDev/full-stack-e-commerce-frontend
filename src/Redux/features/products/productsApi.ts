import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
    
        getFeaturedProducts: builder.query({
            query: () => {
                let url = '/products';
                url += `?isFeatured=true`;

                return {
                    url,
                    method: 'GET',
                };

            },
            transformResponse: (response: any) => {
                return response?.data?.result;
            }
        }),
        getAllProducts: builder.query({
            query: () => {
                let url = '/products';
                return {
                    url,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response?.data?.result;
            }
        }),
        getProductsByCategory: builder.query({
            query: (category: string) => {
                let url = '/products';
                url += `?category=${category}`;
                return {
                    url,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response?.data?.result;
            }
        })


    }),
})

export const { useGetFeaturedProductsQuery, useGetAllProductsQuery, useGetProductsByCategoryQuery } = productsApi;
