import Express from "express";

const Logout = async (req: Express.Request, res: Express.Response) => {
  return res.status(200).json({ message: "Logout success" });
};

export default Logout;
