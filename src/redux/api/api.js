import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/constant.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/add-task",
        method: "POST",
        body: data,
      }),
    }),

    getTasks: builder.query({
      query: () => ({
        url: "/get-tasks",
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: (data) => ({
        url: "/update-task-status",
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/delete-task/${taskId}`,
        method: "DELETE",
      }),
    }),
    updateTask: builder.mutation({
      query: ({ taskId, title, description }) => ({
        url: `/update-task/${taskId}`,
        method: "PUT",
        body: { title, description },
      }),
    }),
  }),
});

export default api;
export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation
} = api;
