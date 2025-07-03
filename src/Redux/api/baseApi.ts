import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api",
    }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
        }),
        createBooks: builder.mutation({
            query: (booksData) => ({
                url: "/posts",
                method: "POST",
                body: booksData,
            })
        }),
        DeleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const {useGetBooksQuery, useCreateBooksMutation, useDeleteBookMutation} = baseApi;