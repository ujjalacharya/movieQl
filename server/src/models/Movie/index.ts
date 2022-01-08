import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Model from "../Model";
import { Director } from "../Director";

@Entity("movies")
@ObjectType()
export class Movie extends Model {

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;
  
  @Field(() => String)
  @Column()
  genre: string;

  @Field(() => String)
  @Column()
  image: string;
  
  //   Relationships
  @Field(() => Director)
  @ManyToOne(() => Director, (director) => director.movie, { eager: true })
  director: Director;
}
