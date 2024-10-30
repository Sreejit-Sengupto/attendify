import { ID } from 'appwrite';
import { account } from './config';

export const register = async (name, email, password, label) => {
  try {
    const promise = await account.create(ID.unique(), email, password, name);
    await fetch(
      'https://attendify-server-7g6h.onrender.com/api/v1/user/label',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: promise.$id,
          label,
        }),
      },
    );
  } catch (error) {
    console.log(error);
  }
};
