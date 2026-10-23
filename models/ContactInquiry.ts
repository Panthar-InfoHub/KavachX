import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "RESOLVED", "ARCHIVED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;
