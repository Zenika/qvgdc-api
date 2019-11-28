function game(parent, args, context) {
  return context.prisma.player({ id: parent.id }).game();
}

function answers(parent, args, context) {
  return context.prisma.player({ id: parent.id }).answers();
}

module.exports = {
  game,
  answers
};
