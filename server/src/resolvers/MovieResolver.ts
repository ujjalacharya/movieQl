import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Director } from "../models/Director";
import { Movie } from "../models/Movie";
import { CreateMovieInput } from "../models/Movie/CreateMovieInput";
import { UpdateMovieInput } from "../models/Movie/UpdateMovieInput";

@Resolver()
export class MovieResolver {
  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }

  @Query(() => Movie)
  movie(@Arg("id") id: string) {
    return Movie.findOne({ where: { id } });
  }

  @Mutation(() => Movie || Boolean)
  async createMovie(@Arg("data") data: CreateMovieInput) {
    const {title, description, directorId, genre, image} = data;

    const director = await Director.findOne({where: {id: directorId}})
    if(!director){
      return false
    }
    const movie = new Movie()
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.image = image;
    movie.genre = genre;
    await movie.save();
    return movie;
  }

  @Mutation(() => Movie)
  async updateMovie(@Arg("id") id: string, @Arg("data") data: UpdateMovieInput) {
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) throw new Error("Movie not found!");
    Object.assign(movie, data);
    await movie.save();
    return movie;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id") id: string) {
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) throw new Error("Movie not found!");
    await movie.remove();
    return true;
  }
}
