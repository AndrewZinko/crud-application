import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiEmployeesSlice = createApi({
    reducerPath: 'api-employees',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Employees'],
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            providesTags: ['Employees']
        }),
        deleteEmployee: builder.mutation({
            query: id => ({
                url: `/employees/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employees']
        }),
        updateEmployee: builder.mutation({
            query: ({id, data}) => ({
                url: `/employees/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employees']
        }),
        createEmployee: builder.mutation({
            query: employee => ({
                url: '/employees',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Employees']
        })
    })
});

export const {useGetEmployeesQuery,
              useDeleteEmployeeMutation,
              useUpdateEmployeeMutation,
              useCreateEmployeeMutation} = apiEmployeesSlice;

export const {reducer, reducerPath, middleware} = apiEmployeesSlice;