import { api } from './api.config'
import { CompanyFormData } from '@/lib/schemas/admin-content'
import { ApiResponse } from '@/types/APIResponse.type'

export interface Company {
  _id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<ApiResponse<Company[]>, void>({
      query: () => ({
        url: '/companies',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: 'Company' as const, id: _id })), { type: 'Company', id: 'LIST' }] : [{ type: 'Company', id: 'LIST' }]),
    }),
    getCompany: builder.query<Company, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Company', id }],
    }),
    createCompany: builder.mutation<ApiResponse<Company>, CompanyFormData>({
      query: (body) => ({
        url: '/companies',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Company', id: 'LIST' }],
    }),
    updateCompany: builder.mutation<ApiResponse<Company>, { id: string; data: CompanyFormData }>({
      query: ({ id, data }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Company', id },
        { type: 'Company', id: 'LIST' },
      ],
    }),
    deleteCompany: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Company', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCompaniesQuery, useGetCompanyQuery, useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companyApi
