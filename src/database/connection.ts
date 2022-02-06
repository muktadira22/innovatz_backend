import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";
import { User } from "./entity/User";

const Connection = async () => {
  try {
    return await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "innovatz_assignment_db",
      entities: [User, Item],
      synchronize: false,
      logging: false,
    });
  } catch (e) {
    console.log(`Connection Error ${e}`);
  }
};

export default Connection;
