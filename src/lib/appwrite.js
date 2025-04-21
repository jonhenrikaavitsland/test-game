import {
  Client,
  Account,
  ID,
  Databases,
  Permission,
  Role,
} from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
export { account, databases, ID, Permission, Role };
