import React from 'react';
import InputForm from '../../../components/input-form';
import { useUserContext } from '../../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useInputForm } from '../../../providers/InputFormProvider';
import { databases } from '../../../appwrite/config';
import { Query } from 'appwrite';
import { loginWithPasskey } from '../../../utils/webauthn';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [category, setCategory] = React.useState('STUDENT');

  const { login } = useUserContext();
  const { formData, setFormData } = useInputForm();

  const navigate = useNavigate();

  const loginOrg = async () => {
    const loadingToastId = toast.loading('Logging in...', {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
    try {
      const validUser = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        [Query.equal('email', [formData.email])],
      );

      if (validUser.total === 0) {
        toast.dismiss(loadingToastId);
        toast.error('Invalid user, please check your email', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        return;
      }

      if (validUser.documents[0].passKey) {
        const webauthnRes = await loginWithPasskey(
          validUser.documents[0],
          'ORG',
        );
        if (!webauthnRes) {
          toast.dismiss(loadingToastId);
          toast.error('Verification Failed', {
            style: {
              backgroundColor: '#121215',
              border: '1px solid #2D2C31',
              borderRadius: '12px',
              color: 'white',
            },
          });
          return;
        }
      }

      await login(formData.email, formData.password);
      navigate(`/admin/dashboard/${validUser.documents[0].$id}`, {
        replace: true,
      });
      toast.dismiss(loadingToastId);
      toast.success('Login successfull', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } finally {
      setFormData({
        name: '',
        mobileNumber: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        orgCode: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
      });
    }
  };

  const loginStudent = async () => {
    const loadingToastId = toast.loading('Logging in...', {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
    try {
      const validUser = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        [Query.equal('email', [formData.email])],
      );

      if (validUser.total === 0) {
        toast.dismiss(loadingToastId);
        toast.error('Invalid user, please check your email', {
          style: {
            backgroundColor: '#121215',
            border: '1px solid #2D2C31',
            borderRadius: '12px',
            color: 'white',
          },
        });
        return;
      }

      await login(formData.email, formData.password);
      navigate(`/dashboard/${validUser.documents[0].$id}`, { replace: true });

      toast.dismiss(loadingToastId);
      toast.success('Login successfull', {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.message, {
        style: {
          backgroundColor: '#121215',
          border: '1px solid #2D2C31',
          borderRadius: '12px',
          color: 'white',
        },
      });
    } finally {
      setFormData({
        name: '',
        mobileNumber: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        orgCode: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
      });
    }
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center my-2 gap-2 font-garamond text-textPrimary">
        <button
          className={`${
            category === 'STUDENT'
              ? 'bg-accent p-2 rounded'
              : 'p-2 border-b-2 border-b-accent'
          }`}
          onClick={() => setCategory('STUDENT')}
        >
          Student
        </button>
        <button
          className={`${
            category === 'ORG'
              ? 'bg-accent p-2 rounded'
              : 'p-2 border-b-2 border-b-accent'
          }`}
          onClick={() => setCategory('ORG')}
        >
          Organisation
        </button>
      </div>

      <div className="w-full">
        {category === 'ORG' && (
          <InputForm
            category={category}
            type={'LOGIN'}
            formHandler={loginOrg}
          />
        )}
      </div>
      <div className="w-full">
        {category === 'STUDENT' && (
          <InputForm
            category={category}
            type={'LOGIN'}
            formHandler={loginStudent}
          />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
