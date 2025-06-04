const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CheckUniqueShopNames = require("../utility/CheckUniqueShopNames");

// USER REGISTRATION API
exports.Registration = async (req, res) => {
    const { email, password, shops } = req.body;

    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passRegex.test(password)) {
        return res.status(400).json({ status: "fail", data: 'Password must be at least 8 characters, contain a number and a special character.' });
    }

    try {
        const unique = await CheckUniqueShopNames(shops);
        if (!unique) {
            return res.status(400).json({ status: "fail", data: 'Shop names must be unique across all users.' });
        }

        const userItem = await UserModel({
            email,
            password: bcrypt.hashSync(password, 10),
            shops,
        });

        const user = await userItem.save();
        if (!user) {
            return res.status(400).json({ status: "fail", data: "Registration fail" });
        }
        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            id: user._id,
            email: user.email,
            shops: shops,
            token: token,
            status: "success",
        });
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error.toString() });
    }
};


// USER LOGIN API
exports.Login = async (req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ status: "fail", data: "This user not found" });
        }
        const check = await bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(400).json({ status: "fail", data: "Invalid credentials. Please try again", });
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: rememberMe ? "7d" : "30m" }
        );
        user.rememberMe = rememberMe;
        await user.save();

        res.status(200).json({
            id: user._id,
            email: user.email,
            shops: req.shops,
            rememberMe: rememberMe,
            token: token,
            status: "success",
        });
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error.toString() });
    }
};

// GET CURRENT USER  API
exports.GetUserInfo = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user.id }).select(
            "-password -createdAt -updatedAt"
        );
        if (!user) {
            res.status(400).json({ status: "fail", data: "The user is not found" });
        } else {
            res.status(200).json({ status: "success", data: user });
        }
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error.toString() });
    }
};