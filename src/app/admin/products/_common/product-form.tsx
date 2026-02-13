"use client";
import { ControlledFileUpload } from "@/components/reusables/controlled-file-upload";
import { ControlledInput } from "@/components/reusables/controlled-input";
import { ControlledSelect } from "@/components/reusables/controlled-select";
import { ControlledSwitch } from "@/components/reusables/controlled-switch";
import { ControlledTextarea } from "@/components/reusables/controlled-textarea";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/buttons/loading-button";
import { Card, CardContent } from "@/components/ui/card";
import HeaderCard from "@/components/ui/cards/header-card";
import {
  IProduct,
  productDTOSchema,
  ProductFormData,
} from "@/types/product-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type ProductForm = z.infer<typeof productDTOSchema>;

interface ProductFormProps {
  onSubmit: (formData: ProductFormData) => void;
  initialData?: IProduct;
  mode?: "add" | "edit";
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialData,
  mode = "add",
  isLoading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productDTOSchema),
    defaultValues: initialData,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleCancel = () => {
    router.push("/admin/products");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-8"
    >
      <Card>
        <HeaderCard title="Basic Information" />
        <CardContent>
          <div className="space-y-4">
            {/* <Label>Product Name</Label>
          <Input
            placeholder="e.g. Velocity Pro"
            className="bg-secondary border-border"
          /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ControlledInput
                control={control}
                name="name"
                type="text"
                label="Product Name*"
                errors={errors}
              />
              <ControlledInput
                control={control}
                name="brand"
                type="text"
                label="Brand"
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ControlledSelect
                control={control}
                name="category"
                label="Category*"
                options={[
                  { value: "running", label: "Running" },
                  { value: "basketball", label: "Basketball" },
                  { value: "lifestyle", label: "Lifestyle" },
                  { value: "casual", label: "Casual" },
                ]}
                errors={errors}
              />
              <div className="space-y-2">
                <ControlledInput
                  control={control}
                  name="shortDescription"
                  type="text"
                  label="Short Description"
                  errors={errors}
                />
              </div>
            </div>
            <div className="space-y-2">
              <ControlledTextarea
                control={control}
                name="description"
                label="Full Description*"
                errors={errors}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Media" />
        <CardContent>
          <ControlledFileUpload
            control={control}
            name="image"
            errors={errors}
            label="Image"
          />
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Pricing & Discount" />
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ControlledInput
            control={control}
            name="price"
            label="Price*"
            errors={errors}
            type="number"
          />
          <ControlledSelect
            control={control}
            name="discountType"
            errors={errors}
            label="Discount Type"
            options={[
              { value: "none", label: "--Select" },
              { value: "percentage", label: "Percentage (%)" },
              { value: "fixed", label: "Fixed Amount ($)" },
            ]}
          />
          <ControlledInput
            control={control}
            name="discountValue"
            label="Discount Value"
            errors={errors}
            type="number"
          />
          <ControlledSwitch
            control={control}
            name="isDiscountEnabled"
            label="Enable Discount?"
            errors={errors}
          />
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Inventory & Identification" />
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ControlledInput
            control={control}
            name="sku"
            label="SKU"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="barcode"
            label="Barcode (ISBN, UPC, etc.)"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="stock"
            label="Stock Quantity*"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="lowStockThreshold"
            label="Low Stock Threshold"
            type="number"
            errors={errors}
          />
          <ControlledSwitch
            control={control}
            name="trackInventory"
            errors={errors}
            label="Track Inventory"
          />
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Variants & Attributes" />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlledInput
            control={control}
            name="sizes"
            label="Sizes (comma separated)"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="colors"
            label="Colors (comma separated)"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="materials"
            label="Materials"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="tags"
            label="Tags (comma separated)"
            errors={errors}
          />
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Shipping" />
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ControlledInput
            control={control}
            name="weight"
            label="Weight"
            type="number"
            errors={errors}
          />
          <ControlledSelect
            control={control}
            name="weightUnit"
            label="Weight Unit"
            errors={errors}
            options={[
              {
                value: "kg",
                label: "Kilogram (kg)",
              },
              {
                value: "lb",
                label: "Pound (lb)",
              },
              {
                value: "gm",
                label: "Gram (gm)",
              },
              {
                value: "oz",
                label: "Ounce (oz)",
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <HeaderCard title="Visibility & Status" />
        <CardContent className="grid grid-cols-1 space-y-4">
          <ControlledSwitch
            control={control}
            name="isPublished"
            label="Is Published?"
            description="Product is visible on the storefront"
          />
          <ControlledSwitch
            control={control}
            name="isNewArrival"
            label="Is New Arrival?"
            description='Show "New" badge on the product'
          />
          <ControlledSwitch
            control={control}
            name="isFeatured"
            label="Is Featured?"
            description="Show on homepage featured section"
          />
        </CardContent>
      </Card>
      <div className="flex gap-3 pt-4">
        <LoadingButton
          type="submit"
          title="Add Product"
          isLoading={isLoading}
        />
        <Button variant="outline" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
