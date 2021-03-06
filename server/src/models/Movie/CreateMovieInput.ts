import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  genre: string;

  @Field()
  image: string;

  @Field()
  directorId: string;
}
