const User = require("../models/User");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || "",
  gender: user.gender || "",
  dob: user.dob,
  address: user.address || {},
  settings: user.settings || {},
  createdAt: user.createdAt,
});

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const { name, email, phone, gender, dob, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email && email.trim().toLowerCase() !== user.email) {
      const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }
    }

    user.name = name?.trim() || user.name;
    user.email = email?.trim().toLowerCase() || user.email;
    user.phone = phone?.trim() || "";
    user.gender = gender || "";
    user.dob = dob || null;
    user.address = {
      line1: address?.line1 || "",
      city: address?.city || "",
      state: address?.state || "",
      pincode: address?.pincode || "",
    };

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const updateMySettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.settings = {
      emailNotifications: Boolean(req.body.emailNotifications),
      smsNotifications: Boolean(req.body.smsNotifications),
      orderUpdates: Boolean(req.body.orderUpdates),
      promotionalEmails: Boolean(req.body.promotionalEmails),
      darkMode: Boolean(req.body.darkMode),
      twoFactorAuth: Boolean(req.body.twoFactorAuth),
      language: req.body.language || "English",
    };

    await user.save();

    return res.json({
      success: true,
      message: "Settings updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  updateMySettings,
};
