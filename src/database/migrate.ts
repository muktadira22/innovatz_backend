import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    console.log("Migrate Successfully");
  })
  .catch((error) => console.log(error));
