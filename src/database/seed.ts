import "reflect-metadata";
import bcrypt from "bcrypt";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Item } from "./entity/Item";
import { DetailTransaction } from "./entity/DetailTransaction";
import { Transaction } from "./entity/Transaction";
import moment from "moment";

createConnection()
  .then(async (connection) => {
    const salt = await bcrypt.genSalt(10);

    // EXAMPLE DATA FOR USER
    const userData = [
      {
        username: "root",
        password: "root",
        firstName: "root",
        lastName: "example",
      },
    ];

    await userData.forEach(async (userItem) => {
      await connection.createQueryBuilder().delete().from(User).execute();
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...userItem,
          password: await bcrypt.hash(userItem.password, salt),
        })
        .execute();
    });

    // EXAMPLE DATA FOR ITEM
    const itemData = [
      {
        name: "Playstation 4",
        description: "description",
        price: 4000000,
      },
      {
        name: "Playstation 5",
        description: "description",
        price: 8000000,
      },
      {
        name: "Nintendo Switch",
        description: "description",
        price: 5000000,
      },
      {
        name: "Playstation 2",
        description: "description",
        price: 2000000,
      },
      {
        name: "XBOX ONE",
        description: "description",
        price: 5000000,
      },
      {
        name: "GTX 1050TI",
        description: "description",
        price: 6500000,
      },
      {
        name: "Legion Gaming Mouse",
        description: "description",
        price: 500000,
      },
      {
        name: "Razer black widow",
        description: "description",
        price: 800000,
      },
      {
        name: "Razer deathader",
        description: "description",
        price: 100000,
      },
    ];

    await connection.createQueryBuilder().delete().from(Item).execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Item)
      .values(itemData)
      .execute();

    // EXAMPLE DATA FOR TRANSACTION
    const generateDay = 80;
    let startDate = moment("2021-12-01", "YYYY-MM-DD");
    let i = 1;

    const itemList = await connection.manager.find(Item);

    await connection.createQueryBuilder().delete().from(Transaction).execute();
    await connection
      .createQueryBuilder()
      .delete()
      .from(DetailTransaction)
      .execute();
    while (i <= generateDay) {
      const itemIdArray = [];
      itemList.forEach((item) => {
        itemIdArray.push([item.id, item.price]);
      });

      const transaction = await connection
        .createQueryBuilder()
        .insert()
        .into(Transaction)
        .values({
          date: startDate.format("YYYY-MM-DD").toString(),
        })
        .returning("id")
        .execute();

      // console.log("insert", transaction.raw[0].id);

      const itemCount = Math.floor(Math.random() * itemIdArray.length + 1);

      for (let j = 1; j <= itemCount; j++) {
        const itemId =
          itemIdArray[Math.floor(Math.random() * itemIdArray.length)][0];
        const price =
          itemIdArray[Math.floor(Math.random() * itemIdArray.length)][1];
        let index = -1;
        for (let indexArr = 0; indexArr < itemIdArray.length; indexArr++) {
          if (itemIdArray[indexArr][0] == itemId) {
            index = indexArr;
            break;
          }
        }
        if (index > -1) itemIdArray.splice(index, 1);

        await connection
          .createQueryBuilder()
          .insert()
          .into(DetailTransaction)
          .values({
            item_id: itemId,
            transaction_id: transaction.raw[0].id,
            qty: Math.floor(Math.random() * itemData.length + 1),
            price,
          })
          .returning("id")
          .execute();
      }

      startDate = startDate.add(1, "days");
      i++;
    }
  })
  .catch((error) => console.log(error));
