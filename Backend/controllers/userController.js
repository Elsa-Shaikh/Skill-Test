import User from "../model/usersSchema.js";

export const createUser = async (req, res) => {
  try {
    const { filename } = req.file;
    // Ensure file has been uploaded
    if (!filename) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const user = new User({
      name: req.body.name,
      picture: filename,
      dob: req.body.dob,
      isActive: req.body.isActive,
      description: req.body.description,
    });

    const newUser = await user.save();
    res
      .status(200)
      .json({ message: "User Created Successfully!", data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    let { page, paginationLimit } = req.query;
    page = parseInt(page) || 1;
    paginationLimit = parseInt(paginationLimit);

    const skip = (page - 1) * paginationLimit;

    const users = await User.find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(paginationLimit);
    const count = await User.countDocuments();

    return res
      .status(200)
      .json({ message: "Fetched all Users!", count: count, data: users });
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error!" });
  }
};

export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the user exists
    const found = await User.findById(userId);
    if (!found) {
      return res.status(404).json({ message: "User not found" });
    }

    let updateData = {
      name: req.body.name,
      dob: req.body.dob,
      isActive: req.body.isActive,
      description: req.body.description,
    };

    // Check if req.file exists
    if (req.file) {
      updateData.picture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData);

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the user exists
    const found = await User.findById(userId);
    if (!found) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
