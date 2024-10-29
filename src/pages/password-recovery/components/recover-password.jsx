import React from "react";
import { Fingerprint, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { account, databases } from "../../../appwrite/config";
import { Query } from "appwrite";

const RecoverPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

  const btnRef = React.useRef(null);

  const category = queryParams.get("category");

  const sendRecoveryMail = async (e) => {
    setLoading(true);
    btnRef.current.disabled = true;
    const recoveryMailVerificationURL = import.meta.env.PROD
      ? "https://attendifyapp.vercel.app/new-password"
      : "http://localhost:5173/new-password";
    try {
      e.preventDefault();

      const isCorrectUser = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        category === "ORG"
          ? import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID
          : import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        [Query.equal("email", [email])]
      );

      if (isCorrectUser.total === 0) {
        alert("You are not registered with this email");
        return;
      }
      await account.createRecovery(email, recoveryMailVerificationURL);
      alert("Recovery mail sent to the provided email");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      btnRef.current.disabled = false;
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#18181C] text-[#E5E5E7]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#121215]">
        <Link className="flex items-center justify-center" href="/">
          <Fingerprint className="h-6 w-6 text-[#FC356C]" />
          <span className="ml-2 text-2xl font-bold text-[#E5E5E7]">
            Attendify
          </span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121215] border border-border py-10 px-5 rounded-lg">
          <div>
            <p className="text-2xl text-center text-[#E5E5E7] font-semibold">
              Password Recovery
            </p>
            <p className="text-center text-[#A9A9AB] text-sm my-2">
              Enter your email address to reset your password
            </p>
          </div>
          <div>
            <form onSubmit={sendRecoveryMail} className="space-y-4 my-7">
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#E5E5E7]"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                  type="email"
                  required
                  className="bg-[#1C1D20] border-[#2D2C31] text-[#E5E5E7] placeholder-[#A9A9AB] p-3 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FC356C] text-[#E5E5E7] hover:bg-[#FC356C]/90 disabled:bg-accent/80 p-3 rounded-lg flex justify-center items-center"
                ref={btnRef}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send Recovery Email"
                )}
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-sm text-[#A9A9AB] hover:text-[#FC356C] inline-flex items-center transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t border-[#2D2C31] bg-[#121215]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-0">
          <p className="text-xs text-[#A9A9AB]">
            © 2024 Attendify. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default RecoverPassword;
