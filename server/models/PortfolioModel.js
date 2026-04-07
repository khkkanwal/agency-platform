import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
    },
    githubLink: {
      type: String,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Portfolio", portfolioSchema);
