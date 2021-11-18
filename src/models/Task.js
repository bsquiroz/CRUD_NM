import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            unique: true,
            trim: true,
            maxlength: [40, "title must be less then 40"],
        },
        describe: {
            type: String,
            required: [true, "describe is required"],
            unique: true,
            trim: true,
            maxlength: [200, "describe must be less then 200"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.Task || model("Task", taskSchema);
