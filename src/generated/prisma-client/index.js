"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Player",
    embedded: false
  },
  {
    name: "Answer",
    embedded: false
  },
  {
    name: "Question",
    embedded: false
  },
  {
    name: "Choice",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://app-097320b7-f47c-4ebf-a1e8-bbb6f0547850.cleverapps.io/`,
  secret: `${process.env["API_SECRET"]}`
});
exports.prisma = new exports.Prisma();
