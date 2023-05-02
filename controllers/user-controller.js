const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require("jimp");

const {User} = require('../models/user');
const {ctrlWrapper} = require('../utils');
const {HttpError} = require('../helpers');

const {SECRET_KEY} = process.env;

const avatarDir = path.join(process.cwd(), "public", "avatars");

const register = async(req, res) => {
   const {email, password} = req.body;

   const hashPassword = await bcrypt.hash(password, 10);

   const avatarURL = gravatar.url(email);

   const result = await User.create({...req.body, password: hashPassword, avatarURL});

   res.status(201).json({
      user: {
      email: result.email,
      subscription: result.subscription,
      },
   });
};

const login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    const { subscription } = await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription,
        },
    });
};

const getCurrent = async(req, res) => {
   const {email, subscription} = req.user;

   res.status(200).json({
    email,
    subscription,
   });
};

const logout = async(req, res) => {
   const {_id} = req.user;
   await User.findByIdAndUpdate(_id, {token: ""});

   res.status(204).json({
    message: "No Content"
   });
};

const patchSub = async(req, res) => {
  const { userId } = req.params;
     
  const result = await User.findByIdAndUpdate(userId, req.body, {new: true} );
  if (!result) {
    throw HttpError(404);
  }

  res.json({
    user: {
      email: result.email,
      subscription: result.subscription
    }
  });
};

const updateAvatar = async(req, res) => {
  const { _id  } = req.user;
  
  const {path: tmpUpload, originalname} = req.file;
  console.log(req.file);

  const avatarName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, avatarName)

  const image = await Jimp.read(tmpUpload);
  await image.resize(250, 250);
  await image.writeAsync(tmpUpload);

  
  const avatarURL = path.join("avatars", avatarName);

  try {
    await fs.rename(tmpUpload, resultUpload);
  } catch (error) {
     await fs.unlink(tmpUpload);
     return error.message;
  }

  await User.findByIdAndUpdate(_id, {avatarURL});

  res.status(200).json({ avatarURL});
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    patchSub: ctrlWrapper(patchSub),
    updateAvatar: ctrlWrapper(updateAvatar),
};