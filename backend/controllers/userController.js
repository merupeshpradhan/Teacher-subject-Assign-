import { catchAsyncError } from "../middlewares/catchAsynchError.js";
import ErrorHandler from "../middlewares/error.js";
import Teacher from "../models/teacherSchema.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  // if (!name || !email || !phone || !role || !password) {
  //   return next(new ErrorHandler("Please fill full registration form!"));
  // }
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill full registration form!"));
  }

  if (role === "teacher") {
    const isEmial = await User.findOne({ email });
    const teacherEmail = await Teacher.findOne({ email });
    if (isEmial) {
      return next(new ErrorHandler("Email already exists!"));
    }

    if (!teacherEmail) {
      return next(new ErrorHandler("Give Valid College Teacher Email!"));
    }

    if (teacherEmail) {
      const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
      });
      sendToken(user, 200, res, "Teacher Registered Successfully!");
    }
  } else {
    const isEmial = await User.findOne({ email });
    const teacherEmail = await Teacher.findOne({ email });
    if (isEmial) {
      return next(new ErrorHandler("Email already exists!"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      role,
      password,
    });
    sendToken(user, 200, res, "Admin Account Created Successfully!");
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email, password and role.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  sendToken(user, 200, res, "User logged in Successfully!");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});

export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Get a user by ID
export const getUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id ${id}`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// Update user 
export const updateUser = catchAsyncError(async (req, res, next) => {
  const { email, phone } = req.body;
  const { id } = req.params;

  let user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id ${id}`, 404));
  }

  user.email = email || user.email;
  user.phone = phone || user.phone;

  await user.save();

  res.status(200).json({ success: true, data: user, message: "Details updated successfully" });
});