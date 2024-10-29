import { Loader2, LogIn, LogOut, Plus } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUserContext } from "../providers/UserProvider";
import AdminRightPanel from "./right-panel";
import { databases } from "../appwrite/config";
import { toast } from "react-toastify";
import CustomModal from "./custom-modal";


const TopBar = ({ category }) => {
  const [loading, setLoading] = React.useState({
    logoutBtnLoader: false,
    attBtnLoader: false,
  });
  const [openModal, setOpenModal] = React.useState(false);

  const params = useParams();

  const { logout, userData } = useUserContext();

  const navigate = useNavigate();

  const startAttendance = async () => {
    try {
      setLoading({ attBtnLoader: true });

      if (!userData.passKey) {
        toast.info("You have not registered your passkey yet!");
        return;
      }

      // Get expiry from session storage
      let expiryTime = sessionStorage.getItem("expiry");
      console.log(Date.now() < expiryTime);
      console.log(expiryTime);

      if (expiryTime) {
        if (Date.now() < expiryTime) {
          toast.warn("A session is already active");
          navigate(`/admin/dashboard/${params.userId}/mark-attendance`);
          return;
        }
      }

      // If it doesn't exists create a new one
      if (!expiryTime || Date.now() > expiryTime) {
        console.log("I'm in");

        expiryTime = Date.now() + 60 * 60 * 1000;
        sessionStorage.setItem("expiry", expiryTime);

        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
          userData.$id,
          {
            classes: userData.classes + 1,
          }
        );

        toast.success("New attendance session started successfully!");

        navigate(`/admin/dashboard/${params.userId}/mark-attendance`);
      }
    } catch (error) {
      toast.error("Failed to start attendamce session: "+error.message);
    } finally {
      setLoading({ attBtnLoader: false });
    }
  };

  const addNewInstitute = async (newOrgId) => {
    try {
      const orgExists = userData.organisation.some(
        (item) => item.$id === newOrgId
      );
      if (orgExists) {
        alert("Already added");
        return;
      }
      console.log("Adding...");

      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        userData.$id,
        {
          organisation: [...userData.organisation, newOrgId],
        }
      );

      console.log("Added");
      window.location.reload();
      navigate(`/dashboard/${userData.$id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading({ logoutBtnLoader: true });
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading({ logoutBtnLoader: false });
    }
  };

  return (
    <div className="flex justify-between items-center p-2 border-b border-b-border bg-primary">
      <div className="flex justify-center items-center gap-1">
        <img
          src={"/android-chrome-256x256.png"}
          alt="Application icon"
          width={60}
          height={60}
        />
        <p className="font-bold lg:text-xl text-textPrimary">Attendify</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="font-garamond bg-accent hover:bg-accent/90 text-textPrimary p-3 rounded-md lg:min-w-[150px] flex justify-center items-center disabled:hover:bg-accent/80"
          onClick={
            category === "ORG" ? startAttendance : () => setOpenModal(true)
          }
          disabled={loading.attBtnLoader}
        >
          {loading.attBtnLoader ? (
            <Loader2 className="animate-spin text-textPrimary" />
          ) : (
            <>
              <span className="hidden lg:inline">
                {category === "ORG" ? "Start Attendance" : "Add Institute"}
              </span>
              <span className="lg:hidden">
                {category === "ORG" ? <LogIn /> : <Plus />}
              </span>
            </>
          )}
        </button>

        <button
          className="bg-primary hover:bg-[#1C1D20] p-3 rounded-lg text-textPrimary lg:min-w-[100px] border border-border"
          onClick={logoutUser}
          disabled={loading.logoutBtnLoader}
        >
          {loading.logoutBtnLoader ? (
            <span className="flex justify-center items-center gap-1">
              <Loader className="animate-spin mx-auto" />
            </span>
          ) : (
            <p>
              <span className="hidden lg:inline">Logout</span>
              <span className="lg:hidden">
                <LogOut />
              </span>
            </p>
          )}
        </button>

        {category === "ORG" && <AdminRightPanel />}
      </div>

      <CustomModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        actionHandler={addNewInstitute}
      />
    </div>
  );
};

export default TopBar;
