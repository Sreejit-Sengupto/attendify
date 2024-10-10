import React from "react";
import { useUserContext } from "../../../providers/UserProvider";
import { useParams } from "react-router-dom";
import RightPanel from "./components/right-panel";
import TopBar from "../../../components/topbar";
import MainPanel from "./components/main-panel";

const DashboardPage = () => {
  const { getUserData } = useUserContext();

  const { userId } = useParams();

  React.useEffect(() => {
    getUserData(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
      userId
    );
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <TopBar category={"ORG"} />
      <div className="relative h-full flex w-full">
        <MainPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
