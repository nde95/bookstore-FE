import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://ndebookstoreapi.azurewebsites.net/api/"
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderDetails) => ({
                url:"order",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: orderDetails,
            }),
        }),
    }),
});

export const { useCreateOrderMutation } = orderApi;
export default orderApi;