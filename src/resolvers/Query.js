async function games(parent, args, context, info) {
  const where = {
    open: args.open
  };

  const games = await context.prisma.games({
    where
  });

  return games;
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
  me
};
