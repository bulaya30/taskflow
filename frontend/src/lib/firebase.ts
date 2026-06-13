import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ================= SIGN IN ================= */
export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  try {
    const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const idToken = await credential.user.getIdToken();

    return idToken;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message, {
            cause: error,
        });
    }

    throw new Error("Authentication failed");
  }
};


export const signUpUser = async (
  email: string,
  password: string
): Promise<string> => {
  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // get Firebase ID token
  const idToken = await credential.user.getIdToken();

  return idToken;
};