import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Model from "../Model";
import { Movie } from "../Movie";

@Entity("directors")
@ObjectType()
export class Director extends Model {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  //   Relationships
  @Field(() => Movie)
  @OneToMany(() => Movie, (movie) => movie.director)
  movie: Movie;
}
