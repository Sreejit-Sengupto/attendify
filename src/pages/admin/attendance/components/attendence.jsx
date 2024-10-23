import React from "react";
import { useUserContext } from "../../../../providers/UserProvider";
import { Fingerprint } from "lucide-react";
import { databases } from "../../../../appwrite/config";
import { Query } from "appwrite";
import { loginWithPasskey } from "../../../../utils/webauthn";

const Attendence = () => {
  const { userData } = useUserContext();

  const [time, setTime] = React.useState(
    sessionStorage.getItem("expiry") - Date.now()
  );

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
    if (time <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

      if (!user) {
        alert("No user found with the following credentials");
      }

      const att = JSON.parse(user.documents[0].attendance);
      console.log(att);

      if (!att[userData.$id]) {
        att[userData.$id] = {
          total: 1,
          expiryTime: Date.now() + 60 * 60 * 1000,
        };
      } else {
        if (Date.now() > att[userData.$id].expiryTime) {
          att[userData.$id].total = att[userData.$id].total + 1;
          att[userData.$id].expiryTime = Date.now() + 60 * 60 * 1000;
        } else {
          alert("Attendance has already been marked");
          return;
        }
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
            attendance: JSON.stringify(att),
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
          <p className="p-3 bg-accent text-textPrimary rounded-lg">
            {userData.$id}
          </p>
        </div>
      </div>
      <p className="text-textPrimary text-right w-full p-3">
        <span className="text-lg">This class/session will end after: </span>
        {formatTime()}
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
