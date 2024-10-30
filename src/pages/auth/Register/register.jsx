import React from 'react';
import InputForm from '../../../components/input-form';
import { useInputForm } from '../../../providers/InputFormProvider';
import { register } from '../../../appwrite/auth';
import { databases } from '../../../appwrite/config';
import { ID } from 'appwrite';
import { useUserContext } from '../../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [category, setCategory] = React.useState('STUDENT');

  const { formData, setFormData } = useInputForm();
  const { login } = useUserContext();

  const navigate = useNavigate();

  const registerOrg = async () => {
    const loadingToastId = toast.loading('Registering...', {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
    try {
      await register(formData.name, formData.email, formData.password, 'ORG');

      const dbData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.mobileNumber,
        addressLine1: formData.line1,
        addressLine2: formData.line2,
        state: formData.state,
        city: formData.city,
      };

      const newOrg = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        ID.unique(),
        dbData,
      );

      await login(formData.email, formData.password);

      navigate(`/admin/dashboard/${newOrg.$id}`, { replace: true });
      toast.dismiss(loadingToastId);
      toast.success('Registered successfully!!', {
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

  const registerStudent = async () => {
    const loadingToastId = toast.loading('Registering...', {
      style: {
        backgroundColor: '#121215',
        border: '1px solid #2D2C31',
        borderRadius: '12px',
        color: 'white',
      },
    });
    try {
      const org = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        formData.orgCode,
      );

      if (!org) {
        toast.dismiss(loadingToastId);
        toast.error('Invalid org-code');
        return;
      }

      await register(
        formData.firstName,
        formData.email,
        formData.password,
        'STD',
      );

      // check if org exists

      const dbData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.mobileNumber,
        organisation: [formData.orgCode],
        rollNumber: formData.rollNo,
      };

      const newStd = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        ID.unique(),
        dbData,
      );

      await login(formData.email, formData.password);

      navigate(`/dashboard/${newStd.$id}`, { replace: true });
      toast.dismiss(loadingToastId);
      toast.success('Registered successfully!!', {
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
              : 'p-2 border-b-2 border-white border-b-accent'
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
            type={'REGISTER'}
            formHandler={registerOrg}
          />
        )}
      </div>
      <div className="w-full">
        {category === 'STUDENT' && (
          <InputForm
            category={category}
            type={'REGISTER'}
            formHandler={registerStudent}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
