import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { MovieResolver } from "./resolvers/MovieResolver";
import { DirectorResolver } from "./resolvers/DirectorResolver";

async function main() {
  await createConnection();
  const schema = await buildSchema({ resolvers: [MovieResolver, DirectorResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");
}

main();
