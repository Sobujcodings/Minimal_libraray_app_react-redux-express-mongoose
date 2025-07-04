import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getSingleBooks: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
      transformResponse: (response) => response.data,
    }),
    getBorrowedBooks: builder.query({
      query: () => "/borrow",
    }),
    createBooks: builder.mutation({
      query: (booksData) => ({
        url: "/books",
        method: "POST",
        body: booksData,
      }),
      invalidatesTags: ["Books"],
    }),
    DeleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ updatedBookData, id }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedBookData,
      }),
      invalidatesTags: ["Books"],
    }),
    BorrowBook: builder.mutation({
      query: (BorrowBookData) => ({
        url: "/borrow",
        method: "POST",
        body: BorrowBookData,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBooksMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
  useGetBorrowedBooksQuery,
  useGetSingleBooksQuery,
} = baseApi;
