import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    type: "float",
  })
  price: number;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;
}
