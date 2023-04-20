import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from "../ultis/error.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
          });

        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(404, "User not found!"));
        
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password!"));
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT,
        { expiresIn: "15m" }
      );
  
      const { password, role, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails, role}, token });
    } catch (err) {
      next(err);
    }
  };

  export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true });
      res.status(200).json(updatedUser);
  } catch (err) {
      next(err);
  }
}

export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
};