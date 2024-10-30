import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import { toast } from 'react-toastify';

const baseURl = import.meta.env.PROD
  ? 'https://attendify-server-7g6h.onrender.com'
  : 'http://localhost:3000';

export const registerPasskey = async (userData, category) => {
  try {
    const response = await fetch(`${baseURl}/api/v1/passkey/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userData.$id, category }),
    });

    const challengeResult = await response.json();

    const { options } = challengeResult;

    const authenticationResult = await startRegistration(options);

    const res = await fetch(`${baseURl}/api/v1/passkey/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userData.$id,
        credential: authenticationResult,
        category,
      }),
    });

    const result = await res.json();
    return result.message;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message, {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
  }
};

export const loginWithPasskey = async (userData, category) => {
  try {
    const response = await fetch(`${baseURl}/api/v1/passkey/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userData.$id, category }),
    });

    const challengeResult = await response.json();
    const { options } = challengeResult;

    const authenticationResult = await startAuthentication(options);

    const res = await fetch(`${baseURl}/api/v1/passkey/verify-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userData.$id,
        category,
        cred: authenticationResult,
      }),
    });

    const result = await res.json();
    return result.verification;
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
  }
};
