import React from 'react';
import { useUserContext } from '../../providers/UserProvider';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/topbar';
import MainPanel from './components/main-panel';

const DashboardPage = () => {
  const { getUserData } = useUserContext();

  const { userId } = useParams();

  React.useEffect(() => {
    getUserData(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
      userId,
    );
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <TopBar />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
