import { MailCheck } from "lucide-react";
import React from "react";
import { toast } from 'react-toastify';

const VerificationPrompt = () => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const resendVerificationMail = () => {
    setBtnDisabled(true);
    toast.success("Mail sent");
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBtnDisabled(false);
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center gap-3 font-poppins">
      <h1 className="font-semibold text-2xl text-center flex flex-col gap-1 justify-center items-center text-textPrimary">
        <span>
          <MailCheck size={100} color="#FC356C" />
        </span>
        <span>Verification Mail sent to your Registered Email</span>
      </h1>
      <p className="text-sm text-textSecondary text-center">
        Plese verify your email and refresh this page to continue to your
        Dashboard.
      </p>

      <button
        className="bg-accent p-3 rounded-lg text-textPrimary disabled:bg-secondary"
        onClick={resendVerificationMail}
        disabled={btnDisabled}
      >
        Resend Verification Code
      </button>
    </div>
  );
};

export default VerificationPrompt;
