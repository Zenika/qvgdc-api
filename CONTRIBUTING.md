# Welcome to QVGDC API contributing guide

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on [qvgdc.zenika.com](https://qvgdc.zenika.com/) :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Getting started

To contribute you'll have to put the right env values and a prisma server. You can start the API with the given docker compose file.

# Setting up a local environment

## Set-up environnement variables

Make a copy of `.env.example` and name it `.env`. 

Fill in the two secrets with random values. 

Set `API_URL` to `http://localhost:4466`

## Set-up database and prisma server
 
In a terminal, at the root of `qvdc-api`. Run the following command : 
```sh
docker-compose up
```

(If the start-up fails on the first run because the database is not initialized immediately, you can retry it)

## Deploy you prisma schema

In folder `prisma`. Run the following command 
```sh
PRISMA_MANAGEMENT_API_SECRET=my-server-secret-123 npx prisma1 deploy -e ../.env
```


## Install dependencies 

At the root of `qvdc-api`. Run the following command : 

```sh
yarn
```
## Set-up your root account

At the root of `qvdc-api`. Run the following command : 
```sh
yarn adduser --mail my.user@example.com --password my-super-secret-password
```

## Run the api

At the root of `qvdc-api`. Run the following command : 

```sh
yarn start
```


This will be your credential when connecting to the app.

And you're done.
You can now continue with the local set-up of [qvdc-app](https://github.com/Zenika/qvgdc-app).

### Make Changes

When you're finished with the changes, create a pull request, also known as a PR.
We will review it and maybe ask you to make some changes.

### Your PR is merged!

Congratulations :tada::tada: Zenika's QVGDC team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [QVGDC Api](https://qvgdc.zenika.com/) for the [QVGDC App](https://qvgdc.zenika.com/).
