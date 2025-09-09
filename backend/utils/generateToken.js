import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token;
};
