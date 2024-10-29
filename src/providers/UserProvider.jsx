import React, { createContext, useContext } from "react";
import { account, databases } from "../appwrite/config";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState({});
  const [passkeyVerified, setPasskeyVerified] = React.useState(false);

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const loadingToastId = toast.loading("Fetching user details...",{
      style: {
        backgroundColor: "#fc356c",
        color: "#fff"
      }
    });
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      toast.dismiss(loadingToastId);
      toast.success("User details fetched successfully!");
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.log(error.message);
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
        const loadingToastId = toast.loading("Sending verficiation mail...",{
          style: {
            backgroundColor: "#fc356c",
            color: "#fff"   
          }
        });
        await account.createVerification(
          "http://attendifyapp.vercel.app/verify-email"
        );
        toast.dismiss(loadingToastId);
        toast.success("Verification mail sent successfully");
      }
    } catch (error) {
      toast.error(error.message);
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
    passkeyVerified,
    setPasskeyVerified,
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
