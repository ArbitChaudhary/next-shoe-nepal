"use server";

import { IProduct } from "@/types/product-types";
import { IApiResponse } from "@/types/response.type";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
} | null;

export async function addProduct(
  prevState: ActionState,
  data: FormData,
): Promise<ActionState> {
  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      body: data,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    const responseData = await res.json();
    revalidatePath("/admin/products");
    // return {
    //   success: true,
    //   message: "Product added successfully",
    // };
    return responseData;
    // eslint-disable-next-line
  } catch (error: any) {
    console.log("Error adding product", error);
    return {
      success: false,
      message:
        error?.message ||
        error?.data?.message ||
        error?.response?.data?.message ||
        "Error adding product",
    };
  }
  //  finally {
  //   redirect("/admin/products");
  // }
}

export async function getProducts(): Promise<IProduct> {
  const res = await fetch(`http://localhost:3000/api/products`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
}

export const getProductById = async (id: string): Promise<IApiResponse> => {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await response.json();
  return result;
};

export const deleteProductById = async (id: string): Promise<IApiResponse> => {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "DELETE",
    // cache: "no-cache",
  });
  const result = await response.json();
  return result;
};
