const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const Users = require('../model/users');
const { HttpCode } = require('../helper/constants');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY_CLOUD, 
  api_secret: process.env.API_SECRET_CLOUD 
});

const uploadToCloud = promisify(cloudinary.uploader.upload);

const reg = async (req, res, next) => {
    const { email } = req.body;
    const user = await findByEmail(email);
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email in use',
        })
    }

    try {
        const newUser = await Users.create(req.body);
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
              subscription: newUser.subscription,
                avatar: newUser.avatarURL,
            }
        })
    } catch (e) {
        next(e)
    }
 };

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

     if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'Unauthorized',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong',
        })
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                    token,
                    user: { email: user.email, subscription: user.subscription },
    },
        })

 };

const current = async (req, res, next) => {
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      user: { email: req.user.email, subscription: req.user.subscription },
    },
  });
};

const logout = async (req, res, next) => {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
};

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  // const avatarUrl = await saveAvatarUser(req);
  const {idCloudAvatar, avatarUrl} = await saveAvatarUserToCloud(req)
  await Users.updateAvatar(id, avatarUrl, idCloudAvatar);
  // await Users.updateAvatar(id, avatarUrl);
  return res.status(HttpCode.OK).json({
    status: 'success', code: HttpCode.OK, data: {avatarUrl}
  })
}

const saveAvatarUser = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
  const pathFile = req.file.path;
  const newNameAvatar = `${req.user.email}-${Date.now().toString()}-${req.file.originalename}`
  const img = await jimp.read(pathFile);
  await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile)
  try {
    await fs.rename(pathFile, path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar));
  } catch (e) {
    console.log(e.message)
  }
  const oldAvatar = req.user.avatarURL
  if (oldAvatar && oldAvatar.includes(`${FOLDER_AVATARS}/`))
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))

  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
  
}

//?????? ?????????????????????????? cloudinari

const saveAvatarUserToCloud = async (req) => {
  const pathFile = req.file.path;
  const {public_id: idCloudAvatar, secure_url: avatarUrl } = await uploadToCloud(pathFile, {
    public_id: req.user.idCloudAvatar?.replace('Avatar/', ''),
    folder: 'Avatars',
    transformation: {width: 250, height: 250, crop: "pad"},
  })

  await fs.unlink(pathFile)
  return {idCloudAvatar, avatarUrl}
}

module.exports = {
  reg,
  login,
  logout,
  current,
  updateAvatar
};