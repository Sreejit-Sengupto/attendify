import React from "react";
import { useUserContext } from "../../../../providers/UserProvider";
import { Fingerprint, OctagonAlert } from "lucide-react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { databases } from "../../../../appwrite/config";
import { Query } from "appwrite";
import { loginWithPasskey } from "../../../../utils/webauthn";

const Attendence = () => {
  const { userData, passkeyVerified, setPasskeyVerified } = useUserContext();
  const [time, setTime] = React.useState(3600);
  const navigate = useNavigate();
  const params = useParams();

  const [input, setInput] = React.useState({
    rollNo: "",
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    if (!passkeyVerified) {
      navigate(`/admin/dashboard/${params.userId}`, { replace: true });
    }
  }, []);

  React.useEffect(() => {
    if (time <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const endAttendance = () => {
    setPasskeyVerified(false);
    navigate(`/admin/dashboard/${params.userId}`, { replace: true });
  };

  const verifyAttendance = async () => {
    try {
      const user = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        [
          Query.or([
            Query.equal("email", [input.email]),
            Query.equal("rollNumber", [input.rollNo]),
          ]),
        ]
      );

      console.log(user);

      if (!user) {
        alert("No user found with the following credentials");
      }

      const res = await loginWithPasskey(user.documents[0], "STD");

      if (!res) {
        alert("Failed to mark your attendance");
      } else {
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
          user.documents[0].$id,
          {
            attendance: user.documents[0].attendance + 1,
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInput({
        rollNo: "",
        email: "",
      });
    }
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="bg-primary p-3 w-full flex justify-between items-center">
        <p className="text-textPrimary text-xl">{userData.name}</p>

        <div className="flex justify-center items-center gap-2">
          <button
            className="text-red-500 px-3 py-2 flex justify-center items-center gap-1 border border-border rounded-lg"
            onClick={endAttendance}
          >
            <span>
              <OctagonAlert />
            </span>
            <span className="text-xl">End</span>
          </button>
          <p className="p-3 bg-accent text-textPrimary rounded-lg">
            {userData.$id}
          </p>
        </div>
      </div>
      <p className="text-textPrimary text-right w-full p-3">
        Time Left: {formatTime()}
      </p>

      <div className="flex flex-col justify-center items-center gap-3 my-auto">
        <div>
          <Fingerprint color="#FC356C" size={80} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <input
            type="text"
            name="rollNo"
            value={input.rollNo}
            onChange={handleChange}
            required
            placeholder="Enter University Roll Number"
            className="p-3 shadow-md rounded focus:outline-none focus:ring focus:ring-accent bg-[#1C1D20] placeholder:text-textSecondary border border-border min-w-[500px] text-textPrimary"
          />
          <div className="flex justify-center items-center gap-2">
            <div className="w-20 h-[2px] bg-border"></div>
            <p className="text-textPrimary">OR</p>
            <div className="w-20 h-[2px] bg-border"></div>
          </div>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
            placeholder="Enter registered Email ID"
            className="p-3 shadow-md rounded focus:outline-none focus:ring focus:ring-accent bg-[#1C1D20] placeholder:text-textSecondary border border-border min-w-[500px] text-textPrimary"
          />
        </div>
        <button
          className="bg-accent text-white font-medium p-3 rounded-lg"
          onClick={verifyAttendance}
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendence;
