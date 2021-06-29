require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./utils");
const { prisma } = require("./generated/prisma-client");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

async function main() {
  const password = await bcrypt.hash(argv.password, 10);
  const newUser = await prisma.createUser({
    email: argv.mail,
    password,
  });
  console.log(`Created new user: ${newUser.email} (ID: ${newUser.id})`);

  const token = jwt.sign({ userId: newUser.id }, APP_SECRET);
  console.log(token);

  const allUsers = await prisma.users();
  console.log(allUsers);
}

main().catch((e) => console.error(e));
