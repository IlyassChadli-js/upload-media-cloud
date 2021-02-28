const express = require("express");
const upload = require("../middleware/upload");
const User = require("../models/user");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");
const router = new express.Router();

//Create a User
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Upload User Image
router.post("/image/:id", upload.single("userImage"), async (req, res) => {
  try {
    //Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "user-images");
    //Save Image Url and publiId ti the database
    const savedImg = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: data.url,
          publicId: data.public_id,
        },
      }
    );

    res.status(200).send("user image uploaded with success!");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete User Image
router.delete("/image/:id", async (req, res) => {
  try {
    //Find user
    const user = await User.findOne({ _id: req.params.id });
    //Find it's publicId
    const publicId = user.publicId;
    //Remove it from cloudinary
    await removeFromCloudinary(publicId);
    //Remove it from the Database
    const deleteImg = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: "",
          publicId: "",
        },
      }
    );
    res.status(200).send("user image deleted with success!");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
