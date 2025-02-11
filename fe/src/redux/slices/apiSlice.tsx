import { API_PORT } from "@/constants";
import { IBoard } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Product } from "./productsSlice";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:${API_PORT}/` }),
  endpoints: (builder) => ({
    addBoard: builder.mutation<IBoard, IBoard>({
      query: (body) => ({
        url: "board",
        method: "POST",
        body,
      }),
    }),
    getBoards: builder.query<IBoard[], void>({
      query: () => `board`,
    }),
    getBoardById: builder.query<IBoard, string>({
      query: (id) => `/board/${id}`,
    }),
    deleteBoard: builder.mutation<string, string>({
      query(id) {
        return {
          url: `board/${id}`,
          method: "DELETE",
        };
      },
      //invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // getCategory: builder.query<Product[], string>({
    //   query: (category) => `/category/${category}`,
    // }),
  }),
});

export const {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  // useLazyGetProductsQuery,
  useLazyGetBoardByIdQuery,
  // useLazyGetCategoryQuery,
} = todoApi;
