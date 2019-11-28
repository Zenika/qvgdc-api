function choices(parent, args, context) {
  return context.prisma.question({ id: parent.id }).choices();
}

function goodChoice(parent, args, context) {
  return context.prisma.question({ id: parent.id }).goodChoice();
}

function answers(parent, args, context) {
  return context.prisma.question({ id: parent.id }).answers();
}

function user(parent, args, context) {
  return context.prisma.question({ id: parent.id }).user();
}

function game(parent, args, context) {
  return context.prisma.question({ id: parent.id }).game();
}

module.exports = {
  choices,
  goodChoice,
  game,
  user,
  answers
};
