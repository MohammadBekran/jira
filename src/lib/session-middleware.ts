import "server-only";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as TAccount,
  type Databases as TDatabases,
  type Storage as TStorage,
  type Users as TUsers,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/core/constants";

type TAdditionalContext = {
  Variables: {
    account: TAccount;
    databases: TDatabases;
    storage: TStorage;
    users: TUsers;
    user: Models.User<Models.Preferences>;
  };
};

const sessionMiddleware = createMiddleware<TAdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "UnAuthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);

export default sessionMiddleware;
