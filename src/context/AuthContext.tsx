import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

type contextType = {
  user: User | null;
  loading: boolean;
  SignUp: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<UserCredential>;
};

export const AuthContext = createContext<contextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Prividers
  const googleProvider = new GoogleAuthProvider();

  const SignUp = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userInfo = {
    user,
    loading,
    SignUp,
    googleLogin,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
