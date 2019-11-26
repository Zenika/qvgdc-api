const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

function newGame(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createGame({
    title: args.title,
    user: { connect: { id: userId } }
  });
}

function updateGame(parent, args, context, info) {
  const userId = getUserId(context);
  let updateObject = {};

  if (args.data.title !== undefined) {
    updateObject["title"] = args.data.title;
  }

  if (args.data.open !== undefined) {
    updateObject["open"] = args.data.open;
  }

  if (args.data.currentQuestion !== undefined) {
    updateObject["currentQuestion"] = args.data.currentQuestion;
  }

  return context.prisma.updateGame({
    data: {
      ...updateObject
    },
    where: {
      id: args.gameId
    }
  });
}

function newQuestion(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createQuestion({
    title: args.title,
    duration: args.duration,
    order: args.order,
    game: { connect: { id: args.gameId } },
    user: { connect: { id: userId } }
  });
}

function newChoice(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createChoice({
    title: args.title,
    question: { connect: { id: args.questionId } },
    user: { connect: { id: userId } }
  });
}

async function newPlayer(parent, args, context, info) {
  const playerExists = await context.prisma.$exists.player({
    game: { id: args.gameId },
    name: args.name
  });

  if (playerExists) {
    throw new Error(`Nom de joueur déjà pris : ${args.name}`);
  }

  return context.prisma.createPlayer({
    name: args.name,
    game: { connect: { id: args.gameId } }
  });
}

function newAnswer(parent, args, context, info) {
  return context.prisma.createAnswer({
    choice: { connect: { id: args.choiceId } },
    player: { connect: { id: args.playerId } }
  });
}

module.exports = {
  login,
  newGame,
  newQuestion,
  newChoice,
  newPlayer,
  newAnswer,
  updateGame
};
