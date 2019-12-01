function updatedGameSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.game({ mutation_in: ["UPDATED"] }).node({
    id: args.gameId
  });
}

const updatedGame = {
  subscribe: updatedGameSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  updatedGame
};
