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
      ...Object.fromEntries(productData),
      image: imageUrl,
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding shoe", error: error?.message, success: false },
      { status: 500 },
    );
  }
};

connectToDatabase();
