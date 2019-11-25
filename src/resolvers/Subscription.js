function updateGameSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.game({ mutation_in: ["UPDATED"] }).node({
    id: args.gameId
  });
}

const updateGame = {
  subscribe: updateGameSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  updateGame
};
