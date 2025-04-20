'use client';
import { account, ID } from '@/app/appwrite';
import { useState } from 'react';

const LoginBox = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(
      email,
      password
    );
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession('current');
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className='flex justify-between p-5'>
        <p>Logged in as {loggedInUser.name}</p>
        <button
          className='bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded-xl cursor-pointer'
          type='button'
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 bg-blue-800 p-5'>
      <p>Not logged in</p>
      <form className='flex flex-col gap-5'>
        <div className='flex gap-5'>
          <input
            className='bg-white text-black font-normal p-2 rounded-xl'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='bg-white text-black font-normal p-2 rounded-xl'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='bg-white text-black font-normal p-2 rounded-xl'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex gap-5 mx-auto'>
          <button
            className='bg-white text-black font-bold py-2 px-4 rounded-xl hover:bg-slate-200 cursor-pointer'
            type='button'
            onClick={() => login(email, password)}
          >
            Login
          </button>
          <button
            className='bg-white text-black font-bold py-2 px-4 rounded-xl hover:bg-slate-200 cursor-pointer'
            type='button'
            onClick={register}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
