import { connectToDatabase } from "@/db-config/db-config";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import { getCleanData } from "../../_libs/getCleanData";
import { uploadToCloudinary } from "@/config/cloudinary";

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">,
) => {
  const { productId } = await ctx.params;

  try {
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 },
      );
    }
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not available",
          success: false,
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error fetching product",
        success: false,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">,
) => {
  const { productId } = await ctx.params;

  try {
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 },
      );
    }
    await Product.findByIdAndDelete(productId);
    return NextResponse.json(
      { message: "Product deleted successfully", success: true },
      { status: 200 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error deleting product",
        success: false,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  ctx: RouteContext<"/api/products/[productId]">,
) => {
  const { productId } = await ctx.params;

  try {
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 },
      );
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 },
      );
    }

    const productData = await req.formData();

    const rawData = Object.fromEntries(productData.entries());
    const cleanData = getCleanData({ data: rawData });

    let imageUrl;
    const imageFile = productData.get("image");
    if (!imageFile) {
      return NextResponse.json({
        success: false,
        error: "Image file is required",
      });
    }
    if (imageFile instanceof File) {
      const bufferArray = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bufferArray);

      const base64Data = buffer.toString("base64");
      const fileUri = `data:${imageFile.type};base64,${base64Data}`;
      const image = await uploadToCloudinary(fileUri);
      imageUrl = image;
    }

    if (imageFile instanceof String) {
      imageUrl = imageFile;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      ...cleanData,
      image: imageUrl,
    });
    if (!updatedProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update product",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      },
      { status: 200 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error updating product",
        success: false,
      },
      { status: 500 },
    );
  }
};

connectToDatabase();
