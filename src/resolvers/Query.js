const { getUserId } = require("../utils");

async function games(parent, args, context, info) {
  const where = {
    open: args.open
  };

  const games = await context.prisma.games({
    where
  });

  return games;
}

async function questions(parent, args, context, info) {
  const userId = getUserId(context);

  const questions = await context.prisma.game({ id: args.gameId }).questions();

  return questions;
}

async function game(parent, args, context, info) {
  const userId = getUserId(context);

  const game = await context.prisma.game({
    id: args.gameId
  });

  return game;
}

async function me(parent, args, context, info) {
  const userId = getUserId(context);

  const user = await context.prisma.user({
    id: userId
  });

  return user;
}

module.exports = {
  games,
  game,
  me,
  questions
};
