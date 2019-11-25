function games(parent, args, context, info) {
  return context.prisma.games();
}

module.exports = {
  games
};
