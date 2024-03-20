import { catchAsyncError } from "../middlewares/catchAsynchError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

// Update admin user
export const updateAdmin = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  const { id } = req.user; // ID of the logged-in user

  // Check if all fields are provided
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("All fields are required to update admin", 400));
  }

  try {
    // Find the admin user by role
    const admin = await User.findOne({ role: "admin" });

    // If admin user not found, return 404 error
    if (!admin) {
      return next(new ErrorHandler("Admin user not found", 404));
    }

    // Check if the logged-in user is the admin user being updated
    if (admin._id.toString() !== id) {
      return next(new ErrorHandler("Only admin user can update their own data", 403));
    }

    // Update the admin user fields
    admin.name = name;
    admin.email = email;
    admin.phone = phone;
    admin.password = password;

    // Save the updated admin user to the database
    await admin.save();

    // Return success response with updated admin user data
    res.status(200).json({ success: true, message: "Data updated successfully", data: admin });
  } catch (error) {
    // Handle any errors that occur during the update process
    return next(new ErrorHandler("Error updating admin user", 500));
  }
});
