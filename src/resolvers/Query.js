async function games(parent, args, context, info) {
  const where = {
    open: args.open
  };

  const games = await context.prisma.games({
    where
  });

  return games;
}

async function getUser(parent, args, context, info) {
  const where = {
    id: args.id
  };

  const user = await context.prisma.user({
    where
  });

  return user;
}

module.exports = {
  games
};
