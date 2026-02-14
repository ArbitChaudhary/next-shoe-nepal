import { uploadToCloudinary } from "@/config/cloudinary";
import { connectToDatabase } from "@/db-config/db-config";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const product = await Product.find();

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error, success: false },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const productData = await req.formData();

    // const cleanData = Object.fromEntries(Object.entries(productData).map(([key, value]) => {
    //   if(value === "undefined" || value === "null" || value === "") {
    //     return [key, null]
    // }))

    const rawData = Object.fromEntries(productData.entries());

    const cleanData = Object.fromEntries(
      Object.entries(rawData).map(([key, value]) => {
        // 1. Convert string 'undefined' or 'null' to actual undefined
        if (value === "undefined" || value === "null" || value === "") {
          return [key, undefined];
        }

        // 2. Convert string booleans to actual booleans
        if (value === "true") return [key, true];
        if (value === "false") return [key, false];

        // 3. Convert numeric strings to actual numbers (for price, stock, etc.)
        const numericFields = ["price", "stock", "lowStockThreshold"];
        if (numericFields.includes(key) && !isNaN(Number(value))) {
          return [key, Number(value)];
        }

        return [key, value];
      }),
    );
    const imageFile = productData.get("image") as File;

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json(
        {
          message: "Image file is required",
          success: false,
        },
        { status: 400 },
      );
    }

    const bufferArray = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bufferArray);

    const base64Data = buffer.toString("base64");
    const fileUri = `data:${imageFile.type};base64,${base64Data}`;

    const imageUrl = await uploadToCloudinary(fileUri);
    // console.log("Image uploaded to Cloudinary:", imageUrl.secure_url);
    const product = await Product.create({
      // ...Object.fromEntries(productData),
      ...cleanData,
      image: imageUrl,
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error adding product",
        error: error?.message,
        success: false,
      },
      { status: 500 },
    );
  }
};

connectToDatabase();
