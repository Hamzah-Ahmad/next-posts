
# NextAuth.js Example

## About this project

This is a Next.js auth template  [NextAuth.js](https://next-auth.js.org/)  library to add Credential and Google authentication to a  Next.js application.
Technologies used:
- Next13
-  NextAuth
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

### 5. Configuring for production

You must set the NEXTAUTH_URL environment variable with the URL of your site, before deploying to production.

e.g.  `NEXTAUTH_URL=https://example.com`
