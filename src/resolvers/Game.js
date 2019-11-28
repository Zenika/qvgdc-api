function players(parent, args, context) {
  return context.prisma.game({ id: parent.id }).players();
}

function questions(parent, args, context) {
  return context.prisma.game({ id: parent.id }).questions();
}

function currentQuestion(parent, args, context) {
  return context.prisma.game({ id: parent.id }).currentQuestion();
}

function user(parent, args, context) {
  return context.prisma.game({ id: parent.id }).user();
}

module.exports = {
  players,
  questions,
  currentQuestion,
  user
};
