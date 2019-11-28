const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Player = require("./resolvers/Player");
const Choice = require("./resolvers/Choice");
const Answer = require("./resolvers/Answer");
const Question = require("./resolvers/Question");
const User = require("./resolvers/User");
const Game = require("./resolvers/Game");
const Subscription = require("./resolvers/Subscription");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Player,
  Choice,
  Answer,
  Question,
  User,
  Game
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(
  {
    port: 8080
  },
  () => console.log("Server running on port 8080")
);
