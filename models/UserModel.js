const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: [true, "This email already exist. Try another one."],
            required: [true, "Enter your e-mail!"],
        },
        password: {
            type: String,
            required: [true, "Enter your password!"],
        },
        shops: {
            type: [String],
            validate: [(val) => val.length >= 3, 'At least 3 shop names required']
        },
        rememberMe: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;