import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPreBooking extends Document {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  cameraCount: string;
  detectionFeatures: string[];
  primaryInterest: string;
  deploymentTimeline: string;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const PreBookingSchema = new Schema<IPreBooking>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    propertyType: {
      type: String,
      required: [true, "Property/business type is required"],
      trim: true,
    },
    cameraCount: {
      type: String,
      required: [true, "Camera count is required"],
      trim: true,
    },
    detectionFeatures: {
      type: [String],
      required: [true, "At least one detection feature is required"],
      default: [],
    },
    primaryInterest: {
      type: String,
      required: [true, "Primary interest is required"],
      trim: true,
    },
    deploymentTimeline: {
      type: String,
      required: [true, "Deployment timeline is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

const PreBooking: Model<IPreBooking> =
  mongoose.models.PreBooking ||
  mongoose.model<IPreBooking>("PreBooking", PreBookingSchema);

export default PreBooking;
