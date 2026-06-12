const mongoose = require("mongoose");
const PROJECT_STATUS = require("../../constants/projectStatus");

const projectSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.NOT_STARTED,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.index({ client: 1 });
projectSchema.index({ status: 1 });

projectSchema.index(
  {
    client: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
