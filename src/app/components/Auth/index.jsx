"use client";

import { account, databases, ID, Role, Permission } from "@/app/appwrite";
import { useEffect, useState } from "react";

export default function Auth() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // // Fetch current session user on mount
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await account.get();
  //       setLoggedInUser(user);
  //     } catch {
  //       // No active session
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Register and auto-login
  const register = async () => {
    console.log(email);
    setError("");
    try {
      // 1) Create account
      const create = await account.create(ID.unique(), email, password, name);
      console.log("create:", create);

      console.log("email on creation: ", email);

      // 2) Create session (auto‑login)
      const login = await account.createEmailPasswordSession(email, password);
      console.log("login:", login);
      console.log("email on auto-login: ", email);

      // 3) Fetch user so we know their $id
      const user = await account.get();
      console.log("session now for: ", user.$id, user.$createdAt);
      setLoggedInUser(user);

      console.log("About to create profile for user:", user.$id);
      console.log(
        "database and collection id: ",
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PLAYERS_COLLECTION_ID
      );

      // 4) Use their user.$id as the doc ID
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PLAYERS_COLLECTION_ID,
        ID.unique(), // ← no chance of collision
        {
          userId: user.$id,
          gold: 0,
          xp: 0,
          level: 1,
        },
        [
          Permission.read(Role.any()), // public read
          Permission.update(Role.user(user.$id)), // only owner updates
        ]
      );

      console.log("response:", response);

      // 5) Clear out the form
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed.");
    }
  };

  // Login existing user
  const login = async (email, password) => {
    setError("");
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      // Clear form
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed.");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  // If user is logged in, show logout
  if (loggedInUser) {
    return (
      <div className="flex justify-between p-5">
        <p>Logged in as {loggedInUser.name}</p>
        <button
          className="bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded-xl cursor-pointer"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  }

  // If not logged in, show form
  return (
    <div className="flex flex-col gap-2 bg-blue-800 p-5">
      <p>Not logged in</p>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-5">
        <div className="flex gap-5">
          <input
            className="bg-white text-black font-normal p-2 rounded-xl"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-white text-black font-normal p-2 rounded-xl"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-white text-black font-normal p-2 rounded-xl"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-5 mx-auto">
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-xl hover:bg-slate-200 cursor-pointer"
            type="button"
            onClick={() => login(email, password)}
          >
            Login
          </button>
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-xl hover:bg-slate-200 cursor-pointer"
            type="button"
            onClick={register}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
