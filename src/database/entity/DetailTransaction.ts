import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class DetailTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  item_id: number;

  @Column()
  @Index()
  transaction_id: number;

  @Column()
  qty: number;

  @Column("float")
  price: number;
}
