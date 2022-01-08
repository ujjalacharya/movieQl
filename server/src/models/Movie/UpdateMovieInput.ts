import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateMovieInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  directorId?: string;
}
