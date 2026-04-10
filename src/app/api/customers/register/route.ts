import { connectToDatabase } from "@/db-config/db-config";
import Customer from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from "../../_libs/generate-otp";
import { transporter } from "../../_libs/nodemailer";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    const customer = await Customer.findOne({ email });
    if (customer) {
      return NextResponse.json(
        { error: "Email already  exists", success: false },
        { status: 400 },
      );
    }
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const newCustomer = await Customer.create({
      ...reqBody,
      verifyOTP: otp,
      verifyOTPExpiry: otpExpiry,
    });
    const mailOptions = {
      from: `Shoe Nepal <${process.env.SMTP_USER}>`,
      to: newCustomer.email,
      subject: "Verify your email",
      text: `Your OTP for email verification is ${otp}. It will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        message: "Customer registered. Please check your email for OTP ",
        success: true,
      },
      { status: 201 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message, success: false },
      { status: 500 },
    );
  }
};

connectToDatabase();
