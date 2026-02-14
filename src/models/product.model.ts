import mongoose from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  sizes: string;
  gallery: string[];
  brand: string;
  discountType: string;
  discountValue: number;
  isDiscountEnabled: boolean;
  sku: string;
  barcode: string;
  lowStockThreshold: number;
  trackInventory: boolean;
  colors: string;
  materials: string;
  tags: string;
  weight: number;
  weightUnit: string;
  isPublished: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    sizes: { type: String, required: true },
    gallery: { type: [String] },
    brand: { type: String },
    discountType: { type: String },
    discountValue: { type: Number },
    isDiscountEnabled: { type: Boolean, default: false },
    sku: { type: String },
    barcode: { type: String },
    lowStockThreshold: { type: Number },
    trackInventory: { type: Boolean, default: false },
    colors: { type: String },
    materials: { type: String },
    tags: { type: String },
    weight: { type: Number },
    weightUnit: { type: String },
    isPublished: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
