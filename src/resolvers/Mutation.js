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

async function newGame(parent, args, context, info) {
  const userId = getUserId(context);

  const game = await context.prisma.createGame({
    title: args.title,
    user: {
      connect: { id: userId }
    }
  });

  return game;
}

async function deleteGame(parent, args, context, info) {
  const userId = getUserId(context);

  const game = await context.prisma.deleteGame({
    id: args.gameId
  });

  return game;
}

async function updateGame(parent, args, context, info) {
  const userId = getUserId(context);
  let updateObject = {};

  if (args.data.title !== undefined) {
    updateObject["title"] = args.data.title;
  }

  if (args.data.open !== undefined) {
    updateObject["open"] = args.data.open;
  }

  if (args.data.state !== undefined) {
    updateObject["state"] = args.data.state;
  }

  if (args.data.finish !== undefined) {
    updateObject["finish"] = args.data.finish;
  }

  if (
    args.data.currentQuestion !== undefined &&
    args.data.currentQuestion !== null
  ) {
    updateObject["currentQuestion"] = {
      connect: { id: args.data.currentQuestion }
    };
  }

  if (args.data.currentQuestion === null) {
    updateObject["currentQuestion"] = {
      disconnect: true
    };
  }

  const game = await context.prisma.updateGame({
    data: {
      ...updateObject
    },
    where: {
      id: args.gameId
    }
  });

  if (
    args.data.currentQuestion !== undefined &&
    args.data.currentQuestion !== null
  ) {
    const question = await context.prisma.updateQuestion({
      data: {
        launched: new Date().toISOString()
      },
      where: {
        id: args.data.currentQuestion
      }
    });
  }

  return game;
}

async function newQuestion(parent, args, context, info) {
  const userId = getUserId(context);
  const questions = await context.prisma.game({ id: args.gameId }).questions();

  const question = await context.prisma.createQuestion({
    title: args.title,
    duration: args.duration,
    order: questions.length + 1,
    game: { connect: { id: args.gameId } },
    user: { connect: { id: userId } }
  });

  return question;
}

async function deleteQuestion(parent, args, context, info) {
  const userId = getUserId(context);

  const question = await context.prisma.deleteQuestion({
    id: args.questionId
  });

  return question;
}

function updateQuestion(parent, args, context, info) {
  const userId = getUserId(context);
  let updateObject = {};

  if (args.data.title !== undefined) {
    updateObject["title"] = args.data.title;
  }

  if (args.data.goodChoiceId !== undefined) {
    updateObject["goodChoice"] = { connect: { id: args.data.goodChoiceId } };
  }

  if (args.data.launched !== undefined) {
    updateObject["launched"] = args.data.launched;
  }

  return context.prisma.updateQuestion({
    data: {
      ...updateObject
    },
    where: {
      id: args.questionId
    }
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

async function deleteChoice(parent, args, context, info) {
  const userId = getUserId(context);

  const choice = await context.prisma.deleteChoice({
    id: args.choiceId
  });

  return choice;
}

function updateChoice(parent, args, context, info) {
  const userId = getUserId(context);

  let updateObject = {};

  if (args.data.title !== undefined) {
    updateObject["title"] = args.data.title;
  }

  return context.prisma.updateChoice({
    data: {
      ...updateObject
    },
    where: {
      id: args.choiceId
    }
  });
}

async function newPlayer(parent, args, context, info) {
  const playerExists = await context.prisma.$exists.player({
    game: { id: args.gameId },
    name: args.name
  });

  const notOpenGameId = await context.prisma.$exists.game({
    id: args.gameId,
    open: false
  });

  if (playerExists || notOpenGameId) {
    throw new Error(`Nom de joueur déjà pris : ${args.name}`);
  }

  return context.prisma.createPlayer({
    name: args.name,
    game: { connect: { id: args.gameId } }
  });
}

async function newAnswer(parent, args, context, info) {
  const answer = await context.prisma.createAnswer({
    choice: { connect: { id: args.choiceId } },
    player: { connect: { id: args.playerId } },
    question: { connect: { id: args.questionId } }
  });

  const [player, oldAnswers, goodChoice] = await Promise.all([
    context.prisma.player({ id: args.playerId }),
    context.prisma.player({ id: args.playerId }).answers(),
    context.prisma.question({ id: args.questionId }).goodChoice()
  ]);

  const responseTimes = [];

  for (let i = 0; i < oldAnswers.length; i++) {
    const val = oldAnswers[i];

    const [
      associatedQuestion,
      associatedChoice,
      associatedGoodChoice
    ] = await Promise.all([
      context.prisma.answer({ id: val.id }).question(),
      context.prisma.answer({ id: val.id }).choice(),
      context.prisma
        .answer({ id: val.id })
        .question()
        .goodChoice()
    ]);

    if (associatedChoice.id !== associatedGoodChoice.id) continue;

    const launchedTime = new Date(associatedQuestion.launched).getTime();
    const answered = new Date(val.createdAt).getTime();
    const responseTime = answered - launchedTime;

    responseTimes.push(responseTime);
  }

  const totalResponseTime = responseTimes.reduce((a, b) => a + b, 0);
  const responseTimeFinal = totalResponseTime / responseTimes.length;
  const updatingPlayer = {
    score:
      goodChoice.id === args.choiceId
        ? player.score === null
          ? 1
          : player.score + 1
        : player.score,
    responseTime: Math.floor(responseTimeFinal)
  };

  const playerupdate = await context.prisma.updatePlayer({
    data: { ...updatingPlayer },
    where: {
      id: args.playerId
    }
  });

  return answer;
}

module.exports = {
  login,
  newGame,
  newQuestion,
  deleteQuestion,
  updateQuestion,
  newChoice,
  deleteChoice,
  updateChoice,
  newPlayer,
  newAnswer,
  updateGame,
  deleteGame
};
