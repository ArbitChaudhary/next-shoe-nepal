export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage?: string;
  role: string;
  isVerified: boolean;
  verifyOTP?: string;
  verifyOTPExpiry?: Date;
  passwordResetOTP?: string;
  passwordResetOTPExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}
