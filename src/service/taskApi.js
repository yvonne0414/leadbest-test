import { baseApi, fixProxy } from './baseApi';

export const tasksApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getTasks: builder.query({
			query: () => fixProxy('/v1/task'),
		}),
		createTask: builder.mutation({
			query: body => ({
				url: fixProxy('/v1/task'),
				method: 'POST',
				body,
			}),
		}),
		deleteTask: builder.mutation({
			query: body => ({
				url: fixProxy('/v1/task'),
				method: 'DELETE',
				body,
			}),
		}),
		updateTask: builder.mutation({
			query: body => ({
				url: fixProxy('/v1/task'),
				method: 'PUT',
				body,
			}),
		}),
		
	}),
	overrideExisting: false,
});

tasksApi.enhanceEndpoints({
	addTagTypes: ['Tasks'],
	endpoints: {
		getTasks: {
			providesTags: ['Tasks'],
		},
		createTask: {
			invalidatesTags: ['Tasks'],
		},
		deleteTask: {
			invalidatesTags: ['Tasks'],
		},
		updateTask: {
			invalidatesTags: ['Tasks'],
		},
	},
});

export default tasksApi;
