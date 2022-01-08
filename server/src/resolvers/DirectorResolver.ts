import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Director } from "../models/Director";
import { CreateDirectorInput } from "../models/Director/CreateDirectorInput";
import { UpdateDirectorInput } from "../models/Director/UpdateDirectorInput";

@Resolver()
export class DirectorResolver {
  @Query(() => [Director])
  directors() {
    return Director.find();
  }

  @Query(() => Director)
  director(@Arg("id") id: string) {
    return Director.findOne({ where: { id } });
  }

  @Mutation(() => Director || Boolean)
  async createDirector(@Arg("data") data: CreateDirectorInput) {
    const {name, description } = data;
 
    const director = new Director()
    director.name = name;
    director.description = description;
    await director.save();
    return director;
  }

  @Mutation(() => Director)
  async updateDirector(@Arg("id") id: string, @Arg("data") data: UpdateDirectorInput) {
    const director = await Director.findOne({ where: { id } });
    if (!director) throw new Error("Director not found!");
    Object.assign(director, data);
    await director.save();
    return director;
  }

  @Mutation(() => Boolean)
  async deleteDirector(@Arg("id") id: string) {
    const director = await Director.findOne({ where: { id } });
    if (!director) throw new Error("Director not found!");
    await director.remove();
    return true;
  }
}
