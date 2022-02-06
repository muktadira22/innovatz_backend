import Express from "express";
import bcrypt from "bcrypt";
import { getConnection } from "typeorm";
import { User } from "../../database/entity/User";
import { generateAccessToken } from "../../utils/jwt";

const Login = async (req: Express.Request, res: Express.Response) => {
  const salt = await bcrypt.genSalt(10);

  const data = req.body;

  const username = data.username;
  const password = data.password;

  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username })
    .getOne();

  if (typeof user === "undefined")
    return res
      .setHeader("Content-Type", "application/json")
      .status(403)
      .json({ message: "Username or password is wrong" });

  if (!bcrypt.compareSync(password, user.password))
    return res
      .setHeader("Content-Type", "application/json")
      .status(403)
      .json({ message: "Username or password is wrong" });

  const returnData = {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    username,
  };

  const token = generateAccessToken(returnData);

  return res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json({ ...returnData, token });
  // res.send("login");
};

export default Login;
