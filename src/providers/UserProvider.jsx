import React, { createContext, useContext } from "react";
import { account, databases } from "../appwrite/config";
import { Loader2 } from "lucide-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);

      const loggedInUser = await account.get();
      setUser(loggedInUser);

      if (!loggedInUser.emailVerification) {
        console.log("Sending verification mail...");
        await account.createVerification(
          "http://attendifyapp.vercel.app/verify-email"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setUserData({});
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async (dbId, collectionId, docId) => {
    try {
      const data = await databases.getDocument(dbId, collectionId, docId);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    user,
    setUser,
    userData,
    setUserData,
    getUserData,
    getUser,
    login,
    logout,
    testData: "Hello",
  };

  return (
    <UserContext.Provider value={contextData}>
      {loading ? (
        <div className="w-full h-[100dvh] flex justify-center items-center">
          <Loader2 className="animate-spin" size={100} color="#443dff" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
