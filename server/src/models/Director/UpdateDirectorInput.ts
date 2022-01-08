import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateDirectorInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;
}
