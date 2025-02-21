import { apiSlice } from "./apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...updatedProject }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: updatedProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    toggleFavorite: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}/favorite`,
        method: "PATCH",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useToggleFavoriteMutation,
} = projectsApi;
