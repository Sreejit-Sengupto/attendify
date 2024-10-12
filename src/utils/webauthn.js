import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export const registerPasskey = async (userData, category) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/passkey/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userData.$id, category }),
      }
    );

    const challengeResult = await response.json();

    const { options } = challengeResult;

    const authenticationResult = await startRegistration(options);
    console.log(authenticationResult);

    const res = await fetch("http://localhost:3000/api/v1/passkey/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData.$id,
        credential: authenticationResult,
        category,
      }),
    });

    console.log(await res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const loginWithPasskey = async (userData, category) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/passkey/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userData.$id, category }),
    });

    const challengeResult = await response.json();
    const { options } = challengeResult;
    console.log(options);

    const authenticationResult = await startAuthentication(options);

    const res = await fetch(
      "http://localhost:3000/api/v1/passkey/verify-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.$id,
          category,
          cred: authenticationResult,
        }),
      }
    );

    const result = await res.json();
    alert(result.message);
  } catch (error) {
    console.log(error);
  }
};
