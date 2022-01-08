import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@ObjectType()
export default abstract class Model extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;
  
  @Field()
  @CreateDateColumn()
  createdAt: Date;
  
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(model?: Partial<any>) {
    super();
    Object.assign(this, model);
  }

  toJSON() {
    return { ...this, deletedAt: undefined };
  }
}
