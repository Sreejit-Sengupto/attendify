import { MailCheck } from "lucide-react";
import React from "react";

const VerificationPrompt = () => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const resendVerificationMail = () => {
    setBtnDisabled(true);
    console.log("Mail sent");
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
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center gap-3 font-roboto">
      <h1 className="font-semibold text-2xl text-center flex flex-col gap-1 justify-center items-center">
        <span>
          <MailCheck size={100} color="#2f27ce" />
        </span>
        <span>Verification Mail sent to your Registered Email</span>
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Plese verify your email and refresh this page to continue to your
        Dashboard.
      </p>

      <button
        className="bg-primary p-3 rounded-lg text-white disabled:bg-secondary"
        onClick={resendVerificationMail}
        disabled={btnDisabled}
      >
        Resend Verification Code
      </button>
    </div>
  );
};

export default VerificationPrompt;
