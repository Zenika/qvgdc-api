async function games(parent, args, context, info) {
  const where = {
    open: args.open
  };

  const games = await context.prisma.games({
    where
  });

  return games;
}

module.exports = {
  games
};
