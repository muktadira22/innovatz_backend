import Express from "express";
import Login from "./login";
import Logout from "./logout";
import authenticateToken from "../../utils/jwt";

const router = Express.Router();

export const AuthRouter = router
  .post("/auth/login", Login)
  .get("/auth/logout", authenticateToken, Logout);
