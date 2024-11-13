import React from 'react';
import { useUserContext } from '../../../providers/UserProvider';
import { useParams } from 'react-router-dom';
import TopBar from '../../../components/topbar';
import MainPanel from './components/main-panel';

const DashboardPage = () => {
  const { user, getUserData, addRedirectUrl } = useUserContext();

  const { userId } = useParams();

  React.useEffect(() => {
    getUserData(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
      userId,
    );
    addRedirectUrl(user.$id, location.pathname);
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <TopBar category={'ORG'} />
      <div className="h-full flex w-full justify-center items-start">
        <MainPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
