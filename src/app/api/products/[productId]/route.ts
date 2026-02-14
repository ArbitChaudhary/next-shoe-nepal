import { connectToDatabase } from "@/db-config/db-config";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

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

connectToDatabase();
