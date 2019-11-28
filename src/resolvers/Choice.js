function question(parent, args, context) {
  return context.prisma.choice({ id: parent.id }).question();
}

function answers(parent, args, context) {
  return context.prisma.choice({ id: parent.id }).answers();
}

function user(parent, args, context) {
  return context.prisma.choice({ id: parent.id }).user();
}

module.exports = {
  question,
  user,
  answers
};
