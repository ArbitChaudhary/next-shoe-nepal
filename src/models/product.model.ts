import { IProductDTO } from "@/types/product-types";
import mongoose from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  sizes: string;
  gallery?: string[];
}

const productSchema = new mongoose.Schema<IProductDTO>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    sizes: { type: String, required: true },
    gallery: { type: [String] },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
