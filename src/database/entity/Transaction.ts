import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "date",
  })
  date: string;
}
