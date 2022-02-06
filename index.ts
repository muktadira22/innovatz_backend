import Express from "express";
import Connection from "./src/database/connection";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { AuthRouter } from "./src/module/auth/router";
import { ItemRouter } from "./src/module/item/router";
import { TransactionRouter } from "./src/module/transaction/router";

const app = Express();
const PORT = 8000;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

Connection().then(() => {
  app.get("/", async (req: Express.Request, res: Express.Response) => {
    res.send("Welcome to Innozatz Backend by Muhammad Aria Muktadir");
  });

  // Auth Route
  app.use(AuthRouter);
  app.use(ItemRouter);
  app.use(TransactionRouter);
  app.listen(PORT, () => {
    console.log(`[server] : Server is running at http://localhost:${PORT}`);
  });
});
