import { z } from "zod";

// export interface IProductDTO {
//   name: string;
//   category: string;
//   price: number;
//   description: string;
//   image: string;
//   stock: number;
//   sizes: string;
//   gallery?: string[];
// }

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  sizes: string;
  gallery?: string[];
  brand?: string;
  discountType?: string;
  discountValue?: number;
  isDiscountEnabled?: boolean;
  sku?: string;
  barcode?: string;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  colors?: string;
  materials?: string;
  tags?: string;
  weight?: number;
  weightUnit?: string;
  isPublished?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  shortDescription?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const productDTOSchema = z.object({
  name: z
    .string({ error: "Product name is required" })
    .min(1, "Product name cannot be empty"),
  category: z
    .string({ error: "Category is required" })
    .min(1, "Please select a category"),
  price: z.coerce
    .number({ error: "Price is required" })
    .int("Price must be a whole number")
    .nonnegative("Price must be greater than 0"),
  description: z
    .string({ error: "Description is required" })
    .min(1, "Description cannot be empty"),
  image: z.union([z.string(), z.instanceof(File)]).optional(),
  stock: z.coerce
    .number({
      error: "Stock is required",
    })
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
  sizes: z
    .string({ error: "Sizes are required" })
    .min(1, "Please specify available sizes"),
  gallery: z
    .union([z.array(z.string()), z.array(z.instanceof(File))])
    .optional(),
  brand: z.string({ error: "Must be string" }).optional(),
  discountType: z.string().optional(),
  discountValue: z.coerce.number().optional(),
  isDiscountEnabled: z.boolean().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  lowStockThreshold: z.coerce
    .number()
    .positive("Must be greater than 0")
    .optional(),
  trackInventory: z.boolean().optional(),
  colors: z.string().optional(),
  materials: z.string().optional(),
  tags: z.string().optional(),
  weight: z.coerce.number().optional(),
  weightUnit: z.string().optional(),
  isPublished: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  shortDescription: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productDTOSchema>;
