import Express from "express";
import moment from "moment";
import { getConnection } from "typeorm";

const CountSellDate = async (req: Express.Request, res: Express.Response) => {
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
  SELECT to_char(t.date, 'dd-mm-yyyy') as name, count(dt.qty) as value
  FROM transaction t
  INNER JOIN detail_transaction dt ON dt.transaction_id = t.id
  INNER JOIN item i ON i.id = dt.item_id
  ${whereQuery}
  GROUP BY t.date
  ORDER BY t.date ASC 
  `);

  return res.status(200).header("content-type", "application/json").json({
    QUERY: whereQuery,
    results: list,
  });
};

export default CountSellDate;
