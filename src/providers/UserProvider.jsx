import React, { createContext, useContext } from 'react';
import { account, databases } from '../appwrite/config';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
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
        const loadingToastId = toast.loading('Sending verficiation mail...', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        await account.createVerification(
          'http://attendifyapp.vercel.app/verify-email',
        );
        toast.dismiss(loadingToastId);
        toast.success('Verification mail sent successfully', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
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
