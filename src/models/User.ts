import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        firebaseUid: {
            type: String,
            required: false,
            unique: true
        },
        favorites: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Recipe' 
    }]
}, {
    timestamps: true
});

type UserType = InferSchemaType<typeof userSchema>;

const User = model<UserType>("User", userSchema);

export default User;
