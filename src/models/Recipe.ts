import { Schema, model, InferSchemaType } from "mongoose";

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        ingredients: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

type RecipeType = InferSchemaType<typeof recipeSchema>;

const Recipe = model<RecipeType>("Recipe", recipeSchema);

export default Recipe;
