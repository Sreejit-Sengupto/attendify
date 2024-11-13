import React, { createContext, useContext } from 'react';
import { account, databases } from '../appwrite/config';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { ID, Query } from 'appwrite';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState({});
  const [passkeyVerified, setPasskeyVerified] = React.useState(false);
  const [url, setUrl] = React.useState('');

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

  const addRedirectUrl = async (userId, url) => {
    try {
      const doc = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_REDIRECT_URL_ID,
        [Query.equal('userId', [userId])],
      );

      if (doc.total === 0) {
        console.log('Im in');

        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_ORG_REDIRECT_URL_ID,
          ID.unique(),
          {
            userId: userId,
            redirectURL: url,
          },
        );
      } else {
        await databases.updateDocument(
          doc.documents[0].$databaseId,
          doc.documents[0].$collectionId,
          doc.documents[0].$id,
          {
            redirectURL: url,
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRedirectUrl = async (userId) => {
    try {
      const doc = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_REDIRECT_URL_ID,
        [Query.equal('userId', [userId])],
      );
      setUrl(doc.documents[0].redirectURL);
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
    addRedirectUrl,
    getRedirectUrl,
    url,
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
