import mongoose from "mongoose";

const visitorAnalyticsSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    desktopViews: { type: Number, default: 0 },
    mobileViews: { type: Number, default: 0 },
    topPages: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("VisitorAnalytics", visitorAnalyticsSchema);
