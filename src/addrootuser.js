const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./utils");
const { prisma } = require("./generated/prisma-client");

async function main() {
  const password = await bcrypt.hash("", 10);
  const newUser = await prisma.createUser({
    email: "",
    password
  });
  console.log(`Created new user: ${newUser.email} (ID: ${newUser.id})`);

  const token = jwt.sign({ userId: newUser.id }, APP_SECRET);
  console.log(token);

  const allUsers = await prisma.users();
  console.log(allUsers);
}

main().catch(e => console.error(e));
