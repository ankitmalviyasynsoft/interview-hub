import { api } from './api.config'
import { QuestionFormData } from '@/lib/schemas/admin-content'
import { ApiResponse } from '@/types/APIResponse.type'

export interface Question extends QuestionFormData {
  _id: string
  createdAt?: string
  updatedAt?: string
}

export const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<ApiResponse<Question[]>, void>({
      query: () => ({
        url: '/questions',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: 'Question' as const, id: _id })), { type: 'Question', id: 'LIST' }] : [{ type: 'Question', id: 'LIST' }]),
    }),
    getQuestion: builder.query<Question, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<Question>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Question', id }],
    }),
    createQuestion: builder.mutation<ApiResponse<Question>, QuestionFormData>({
      query: (body) => ({
        url: '/questions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
    updateQuestion: builder.mutation<ApiResponse<Question>, { id: string; data: QuestionFormData }>({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Question', id },
        { type: 'Question', id: 'LIST' },
      ],
    }),
    deleteQuestion: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetQuestionsQuery, useGetQuestionQuery, useCreateQuestionMutation, useUpdateQuestionMutation, useDeleteQuestionMutation } = questionApi
