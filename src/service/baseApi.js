import {createApi,fetchBaseQuery}from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath:"baseapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: headers => {
		const authToken = "xFolfNMzncZRG3c2NM8whjm8tsY8U5Yzs9k_x3UKpgwLYUHqKQ";
		headers.set('Content-Type', 'application/json;charset=UTF-8');
		headers.set('Authorization', `Bearer ${authToken}`);
    return headers;
	},
  }),
  endpoints: () => ({}),
})

export const fixProxy = (url)=>{
  return `/proxy-api${url}`
}