import Express from "express";
import moment from "moment";
import { getConnection } from "typeorm";

const CountSellItem = async (req: Express.Request, res: Express.Response) => {
  // Get request params
  // let sort = {
  //   createdAt: -1,
  // };

  let item_id = null;
  let start_date = moment().startOf("month").format("YYYY-MM-DD");
  let end_date = moment().endOf("month").format("YYYY-MM-DD");
  let itemQuery = "";
  let dateQuery = "";
  let whereQuery = "";

  if (req.query && req.query.item_id) {
    item_id = (req.query as any).item_id;
    itemQuery = `i.id = ${item_id}`;
  }

  if (req.query && req.query.start_date && req.query && req.query.end_date) {
    start_date = (req.query as any).start_date;
    end_date = (req.query as any).end_date;
  }

  dateQuery = `t.date between '${start_date}' AND '${end_date}'`;

  if (itemQuery !== "" || dateQuery !== "") {
    whereQuery += "WHERE ";
    [itemQuery, dateQuery].forEach((item, key) => {
      if (key == 0) {
        if (item !== "") whereQuery += `${item} AND `;
      } else {
        if (item !== "") whereQuery += `${item} `;
      }
    });
  }
  const list = await getConnection().manager.query(`
  SELECT i.id, i.name, sum(dt.qty) as value 
  FROM item i 
  INNER JOIN detail_transaction dt ON dt.item_id = i.id
  INNER JOIN transaction t ON dt.transaction_id = t.id
  ${whereQuery}
  GROUP BY i.id, i.name
  ORDER BY value DESC`);

  return res.status(200).header("content-type", "application/json").json({
    results: list,
  });
};

export default CountSellItem;
