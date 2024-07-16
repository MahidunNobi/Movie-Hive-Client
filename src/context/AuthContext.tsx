import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

type contextType = {
  user: User | null;
  loading: boolean;
  SignUp: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  updateAccount: (name: string, photoURL?: string) => Promise<void>;
};

export const AuthContext = createContext<contextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Custome hooks
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Prividers
  const googleProvider = new GoogleAuthProvider();

  const SignUp = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const res = await axiosSecure("/logout");
    console.log(res.data);
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateAccount = (name: string, photoURL?: string) => {
    return updateProfile(auth.currentUser as User, {
      displayName: name,
      photoURL: photoURL || "",
    });
  };

  const userInfo = {
    user,
    loading,
    SignUp,
    googleLogin,
    login,
    logout,
    updateAccount,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const res = await axiosSecure.post("/jwt", {
          email: currentUser.email,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
