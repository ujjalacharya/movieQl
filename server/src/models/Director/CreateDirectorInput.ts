import { InputType, Field } from "type-graphql";

@InputType()
export class CreateDirectorInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
