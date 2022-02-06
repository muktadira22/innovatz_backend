import Express from "express";
import SumProfit from "./sum_profit";
import CountSellItem from "./count_sell_item";
import CountSellDate from "./count_sell_date";
import SumProfitCountQty from "./sum_profit_and_qty";
import authenticateToken from "../../utils/jwt";

const router = Express.Router();

export const TransactionRouter = router
  .get("/transaction/sum-profit", authenticateToken, SumProfit)
  .get("/transaction/count-sell-item", authenticateToken, CountSellItem)
  .get("/transaction/count-sell-date", authenticateToken, CountSellDate)
  .get("/transaction/profit-count", authenticateToken, SumProfitCountQty);
