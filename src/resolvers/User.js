function games(parent, args, context) {
  return context.prisma.user({ id: parent.id }).games();
}

module.exports = {
  games
};
