import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productItemApi = createApi({
  reducerPath: "productItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ndebookstoreapi.azurewebsites.net/api/",
  }),
  tagTypes: ["ProductItems"],
  endpoints: (builder) => ({
    getProductItems: builder.query({
      query: () => ({
        url: "productitem",
      }),
      providesTags: ["ProductItems"],
    }),
    getProductItemById: builder.query({
      query: (id) => ({
        url: `productitem/${id}`,
      }),
      providesTags: ["ProductItems"],
    }),
    updateProductItem: builder.mutation({
      query: ({ data, id }) => ({
        url: "productitem/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProductItems"],
    }),
    createProductItem: builder.mutation({
      query: (data) => ({
        url: "productitem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductItems"],
    }),
    deleteProductItem: builder.mutation({
      query: (id) => ({
        url: "productitem/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductItems"],
    }),
  }),
});

export const {
  useGetProductItemsQuery,
  useCreateProductItemMutation,
  useDeleteProductItemMutation,
  useUpdateProductItemMutation,
  useGetProductItemByIdQuery,
} = productItemApi;
export default productItemApi;
