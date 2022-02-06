import Express from "express";
import jwt from "jsonwebtoken";

export const generateAccessToken = (data: object) => {
  return jwt.sign({ data }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
};

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).json({ message: "Token not found" });

    console.log(token);

    const authenticated = await jwt.verify(token, process.env.TOKEN_SECRET);

    if (!authenticated)
      return res.status(403).json({ message: "Session Not Found" });

    next();
  } catch (e) {
    if (e.name == "TokenExpiredError")
      return res.status(401).json({ message: "Session has expired" });
    return res.status(401).json({ message: "Session Error" });
  }
};
