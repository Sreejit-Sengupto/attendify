import React, { createContext, useContext } from "react";
import { account } from "../appwrite/config";
import { Loader2 } from "lucide-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

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
        await account.createVerification("http://localhost:5173/verify-email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    user,
    setUser,
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
