import { API_PORT } from "@/constants";
import { IBoard, ITask } from "@/types";
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
    getTasksByBoardId: builder.query<ITask[], string>({
      query: (id) => `task/board/${id}`,
    }),
    deleteBoard: builder.mutation<string, string>({
      query(id) {
        return {
          url: `board/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateBoard: builder.mutation<IBoard, { oldId: string; id: string }>({
      query({ oldId, ...body }) {
        return {
          url: `board/${oldId}`,
          method: "PATCH",
          body,
        };
      },
    }),

    addTask: builder.mutation<ITask, Partial<ITask>>({
      query: (body) => ({
        url: "task",
        method: "POST",
        body,
      }),
    }),
    deleteTask: builder.mutation<number, number>({
      query(id) {
        return {
          url: `task/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateTask: builder.mutation<ITask, Partial<ITask>>({
      query({ id, ...body }) {
        return {
          url: `task/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});

export const {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetBoardsQuery,
  useLazyGetBoardsQuery,
  useLazyGetBoardByIdQuery,
  useLazyGetTasksByBoardIdQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = todoApi;
