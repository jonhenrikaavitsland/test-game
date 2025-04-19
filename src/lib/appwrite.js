import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // e.g. http://localhost/v1
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const db = new Databases(
  client,
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
);
