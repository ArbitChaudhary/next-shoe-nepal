import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ICustomer } from "@/types/customer.type";

export const customerSchema = new mongoose.Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    profileImage: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    verifyOTP: { type: String, default: null },
    verifyOTPExpiry: { type: Number, default: 0 },
    passwordResetOTP: { type: String, default: null },
    passwordResetOTPExpiry: { type: Number, default: 0 },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  {
    timestamps: true,
  },
);

customerSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

const Customer =
  mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
