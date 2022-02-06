import Express from "express";
import { getConnection } from "typeorm";
import { Item } from "../../database/entity/Item";

const List = async (req: Express.Request, res: Express.Response) => {
  let page = 0;
  let page_size = 10;
  let search = "";

  if (req.query && req.query.page) {
    page = (req.query as any).page - 1;
  }

  if (req.query && req.query.page_size) {
    page_size = (req.query as any).page_size;
  }

  if (req.query && req.query.search) {
    search = (req.query as any).search;
  }

  const list = await getConnection()
    .getRepository(Item)
    .createQueryBuilder("item")
    .take(page_size)
    .skip(page)
    .where("item.name LIKE :search", { search: `%${search}%` })
    .getMany();
  return res.status(200).json({
    results: list,
  });
};

export default List;
