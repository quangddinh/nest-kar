import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // hide or show more information use:
  // authorize: Exclude() or Interceptors
  @Column()
  password: string;

  // after create entity -> connect to the parent module
}
