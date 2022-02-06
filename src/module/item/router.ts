import Express from "express";
import List from "./list";
import authenticateToken from "../../utils/jwt";

const router = Express.Router();

export const ItemRouter = router.get("/item", authenticateToken, List);
