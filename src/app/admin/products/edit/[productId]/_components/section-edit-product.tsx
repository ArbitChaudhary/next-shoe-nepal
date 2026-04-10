"use client";
import { IProduct, ProductFormData } from "@/types/product-types";
import ProductForm from "../../../_common/product-form";
import { useTransition } from "react";
import { updateProductById } from "@/actions/product.actions";
import { toast } from "sonner";

interface SectionEditProductProps {
  product: IProduct;
}

export default function SectionEditProduct({
  product,
}: SectionEditProductProps) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: ProductFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // if(value instanceof File) {
        //   formData.append(key,value[0] as string)
        // }
        formData.append(key, value as string);
      }
      const res = await updateProductById({ id: product._id, data: formData });
      if (res.success) {
        toast.success(res.message || "Product updated successfully");
      }
      if (!res.success) {
        toast.error(res.error || res.message || "Error updating product");
      }
    });
  };
  return (
    <div>
      <ProductForm
        onSubmit={onSubmit}
        initialData={product}
        mode="edit"
        isLoading={isPending}
      />
    </div>
  );
}
