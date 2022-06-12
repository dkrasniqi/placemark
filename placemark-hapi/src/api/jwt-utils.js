import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();


export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.COOKIE_PASS, options);
}

export function decodeToken(token) {
  const userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.COOKIE_PASS);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
    userInfo.role = decoded.role;
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);

  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}