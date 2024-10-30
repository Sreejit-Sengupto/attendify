import React from 'react';
import { useUserContext } from '../providers/UserProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { databases } from '../appwrite/config';
import { Query } from 'appwrite';
import { Circle, Loader2 } from 'lucide-react';

const ProtectAuth = ({ children }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    getActiveUser();
  }, []);

  const getActiveUser = async () => {
    if (!user) {
      console.log('No user');
      setFetched(true);
      return;
    }

    const std = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
      [Query.equal('email', [user.email])],
    );

    const org = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
      [Query.equal('email', [user.email])],
    );

    if (org.documents.length === 0) {
      navigate(`/dashboard/${std.documents[0].$id}`);
    }
    navigate(`/admin/dashboard/${org.documents[0].$id}`);
    setFetched(true);
  };

  return !fetched ? (
    <div className="h-[100dvh] w-full flex justify-center items-center">
      <Loader2 color="#FC356C" className="animate-spin" size={100} />
    </div>
  ) : (
    children
  );
};

export default ProtectAuth;
