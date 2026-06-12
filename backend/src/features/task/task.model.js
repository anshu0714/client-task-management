const mongoose = require("mongoose");

const TASK_STATUS = require("../../constants/taskStatus");
const TASK_PRIORITY = require("../../constants/taskPriority");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      default: TASK_PRIORITY.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.PENDING,
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ assignedUser: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });

taskSchema.index({
  assignedUser: 1,
  status: 1,
});

taskSchema.index(
  {
    project: 1,
    title: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
