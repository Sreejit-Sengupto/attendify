import { Fingerprint, Loader2, LogIn, LogOut, Plus } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useUserContext } from '../providers/UserProvider';
import RightPanel from './right-panel';
import { databases } from '../appwrite/config';
import { toast } from 'react-toastify';
import CustomModal from './custom-modal';

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
        toast.info('You have not registered your passkey yet!', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        return;
      }

      // Get expiry from session storage
      let expiryTime = sessionStorage.getItem('expiry');
      console.log(Date.now() < expiryTime);
      console.log(expiryTime);

      if (expiryTime) {
        if (Date.now() < expiryTime) {
          toast.warn('A session is already active', {
            style: {
              backgroundColor: '#121215',
              border: '1px solid #2D2C31',
              borderRadius: '12px',
              color: 'white',
            },
          });
          navigate(`/admin/dashboard/${params.userId}/mark-attendance`);
          return;
        }
      }

      // If it doesn't exists create a new one
      if (!expiryTime || Date.now() > expiryTime) {
        expiryTime = Date.now() + 60 * 60 * 1000;
        sessionStorage.setItem('expiry', expiryTime);

        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
          userData.$id,
          {
            classes: userData.classes + 1,
          },
        );

        toast.success('New attendance session started successfully!', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });

        navigate(`/admin/dashboard/${params.userId}/mark-attendance`);
      }
    } catch (error) {
      toast.error('Failed to start attendamce session: ' + error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } finally {
      setLoading({ attBtnLoader: false });
    }
  };

  const addNewInstitute = async (newOrgId) => {
    try {
      const orgExists = userData.organisation.some(
        (item) => item.$id === newOrgId,
      );
      if (orgExists) {
        toast.info('Already added', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        return;
      }
      toast.loading('Adding...', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });

      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        userData.$id,
        {
          organisation: [...userData.organisation, newOrgId],
        },
      );

      toast.success('New Instititue added', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
      window.location.reload();
      navigate(`/dashboard/${userData.$id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    }
  };

  const logoutUser = async () => {
    try {
      setLoading({ logoutBtnLoader: true });
      await logout();
      navigate('/login');
      toast.info('Logged out', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } catch (error) {
      toast.error(error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } finally {
      setLoading({ logoutBtnLoader: false });
    }
  };

  return (
    <div className="flex justify-between items-center p-2 border-b border-b-border bg-primary">
      <div className="flex justify-center items-center">
        <Fingerprint className="h-6 w-6 text-[#FC356C]" />
        <span className="ml-2 text-2xl font-bold text-[#E5E5E7]">
          Attendify
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="font-garamond bg-accent hover:bg-accent/90 text-textPrimary p-3 rounded-md lg:min-w-[150px] flex justify-center items-center disabled:hover:bg-accent/80"
          onClick={
            category === 'ORG' ? startAttendance : () => setOpenModal(true)
          }
          disabled={loading.attBtnLoader}
        >
          {loading.attBtnLoader ? (
            <Loader2 className="animate-spin text-textPrimary" />
          ) : (
            <>
              <span className="hidden lg:inline">
                {category === 'ORG' ? 'Start Attendance' : 'Add Institute'}
              </span>
              <span className="lg:hidden">
                {category === 'ORG' ? <LogIn /> : <Plus />}
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

        <RightPanel category={category} />
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
