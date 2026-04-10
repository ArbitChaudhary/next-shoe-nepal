import Customer from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, otp } = reqBody;
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Insufficient data provided", success: false },
        { status: 400 },
      );
    }
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 },
      );
    }
    if (customer.isVerified) {
      return NextResponse.json(
        { error: "User already verified", success: false },
        { status: 400 },
      );
    }
    if (customer.verifyOTPExpiry < Date.now()) {
      return NextResponse.json(
        {
          error: "OTP has expired, please request for new OTP",
          success: false,
        },
        { status: 400 },
      );
    }
    if (customer.verifyOTP !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP", success: false },
        { status: 400 },
      );
    }
    customer.isVerified = true;
    customer.verifyOTP = null;
    customer.verifyOTPExpiry = 0;
    await customer.save();
    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
        data: customer,
        token: token,
      },
      { status: 200 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong", success: false },
      { status: 500 },
    );
  }
};
