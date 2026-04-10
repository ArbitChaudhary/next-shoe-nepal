import Customer from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP } from "../../_libs/generate-otp";
import { transporter } from "../../_libs/nodemailer";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
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
    const isPasswordValid = await bcrypt.compareSync(
      password,
      customer.password,
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials", success: false },
        { status: 400 },
      );
    }
    if (!customer.isVerified) {
      const otp = generateOTP();
      const mailOptions = {
        from: `Shoe Nepal <${process.env.SMTP_USER}>`,
        to: customer.email,
        subject: "Verify your email",
        text: `Your OTP for email verification is ${otp}. It will expire in 10 minutes.`,
      };
      customer.verifyOTP = otp;
      customer.verifyOTPExpiry = Date.now() + 10 * 60 * 1000;
      await customer.save();
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        {
          message:
            "Email not verified. OTP sent to your email for verification.",
          success: false,
        },
        { status: 400 },
      );
    }
    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
    return NextResponse.json(
      { message: "Login successful", success: true, data: customer, token },
      { status: 200 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Login error", success: false },
      { status: 500 },
    );
  }
};
