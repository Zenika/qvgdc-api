function updatedGameSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .game({
      mutation_in: ["UPDATED"],
      node: {
        id: args.gameId
      }
    })
    .node();
}

const updatedGame = {
  subscribe: updatedGameSubscribe,
  resolve: payload => {
    return payload;
  }
};

function updatedPlayerSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .player({
      mutation_in: ["UPDATED"],
      node: {
        id: args.playerId
      }
    })
    .node();
}

const updatedPlayer = {
  subscribe: updatedPlayerSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  updatedGame,
  updatedPlayer
};
