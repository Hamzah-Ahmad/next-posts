
# Next Posts

## About this project

A blog type application built using Next 14 to familiarize with the framework's latest features including server components, and server actions and mutations.

## Live Site
https://next-posts-zeta.vercel.app/posts

### Dummy user credentials for testing
username: john@email.com

password: userpass


## Technologies used:
- Next14
- NextAuth
- Prisma
- Postgres
- React Hook Form
- Zod

## Getting started

### 1. Configure your local environment
Copy the .env.example file in this directory to .env(which will be ignored by Git):
- Info regarding `NEXTAUTH_SECRET` can be found [here](https://next-auth.js.org/configuration/options#nextauth_secret)
- Info regarding `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` can be found [here](https://www.balbooa.com/gridbox-documentation/how-to-get-google-client-id-and-client-secret) 
- In order to remove either the Client or Google providers, the specific provider needs to be removed from the providers array in the route file in`[...nextauth]`

#### Database configuration
A database is needed to persist user accounts and to support email sign in.
The template uses Prisma as the ORM and Postgres as the database. Add the database URL in the `.env`  file. 
Run the migrations and generate the Prisma client. Further information regarding Prisma can be found [here](https://www.prisma.io/docs/concepts/components/prisma-migrate)


### 4. Start the application

To run your site locally, use:

```
npm run dev

```