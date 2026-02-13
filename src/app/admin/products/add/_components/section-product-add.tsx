"use client";
import { addProduct } from "@/actions/product.actions";
import { useTransition } from "react";
import { toast } from "sonner";
import ProductForm from "../../_common/product-form";
import { ProductFormData } from "@/types/product-types";

const SectionAddProduct = () => {
  //   const [state, formAction, isPending] = useActionState(addProduct, null);
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
      const result = await addProduct(null, formData);
      if (result?.success === true) {
        toast.success(result.message || "Product added successfully");
      }
      if (result?.success === false) {
        toast.error(result?.message || "Error adding product");
      }
    });
  };

  return (
    <div>
      <ProductForm onSubmit={onSubmit} isLoading={isPending} mode="add" />
    </div>
  );
};

export default SectionAddProduct;
