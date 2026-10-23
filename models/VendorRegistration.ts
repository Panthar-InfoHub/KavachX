import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVendorRegistration extends Document {
  contactPersonName: string;
  designation: string;
  companyName: string;
  phone: string;
  email: string;
  businessType: string;
  city: string;
  state: string;
  districts?: string;
  productsDistributed: string[];
  primaryCustomers: string[];
  monthlyCustomers: string;
  partnershipType: string;
  interestedSolutions: string[];
  businessOverview: string;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const VendorRegistrationSchema = new Schema<IVendorRegistration>(
  {
    contactPersonName: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company/business name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Contact phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Business email address is required"],
      trim: true,
      lowercase: true,
    },
    businessType: {
      type: String,
      required: [true, "Business type description is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    districts: {
      type: String,
      trim: true,
      default: "",
    },
    productsDistributed: {
      type: [String],
      required: [true, "Products distributed selection is required"],
      default: [],
    },
    primaryCustomers: {
      type: [String],
      required: [true, "Primary customers selection is required"],
      default: [],
    },
    monthlyCustomers: {
      type: String,
      required: [true, "Monthly customer count is required"],
      trim: true,
    },
    partnershipType: {
      type: String,
      required: [true, "Partnership type is required"],
      trim: true,
    },
    interestedSolutions: {
      type: [String],
      required: [true, "Interested solutions selection is required"],
      default: [],
    },
    businessOverview: {
      type: String,
      required: [true, "Business overview description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "IN_PROGRESS", "APPROVED", "REJECTED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

const VendorRegistration: Model<IVendorRegistration> =
  mongoose.models.VendorRegistration ||
  mongoose.model<IVendorRegistration>("VendorRegistration", VendorRegistrationSchema);

export default VendorRegistration;
