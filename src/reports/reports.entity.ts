import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
  // after create entity -> connect to the parent module
}
