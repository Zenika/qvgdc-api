function choice(parent, args, context) {
  return context.prisma.answer({ id: parent.id }).choice();
}

function player(parent, args, context) {
  return context.prisma.answer({ id: parent.id }).player();
}

module.exports = {
  choice,
  player
};
