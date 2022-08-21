import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiFiltersSlice = createApi({
    reducerPath: 'api-filters',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Filters'],
    endpoints: builder => ({
        getFilters: builder.query({
            query: () => '/filters',
            providesTags: ['Filters']
        }),
        updateActiveFilter: builder.mutation({
            query: data => ({
                url: '/filters',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Filters']
        })
    })
});

export const {
    useGetFiltersQuery,
    useUpdateActiveFilterMutation
} = apiFiltersSlice;

export const {reducer, reducerPath, middleware} = apiFiltersSlice;