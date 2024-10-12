import React from "react";
import { useUserContext } from "../../../../providers/UserProvider";
import { registerPasskey } from "../../../../utils/webauthn";
import { Fingerprint, Loader2 } from "lucide-react";

const MainPanel = () => {
  const { userData } = useUserContext();

  const [loading, setLoading] = React.useState(false);

  const registerOrgPasskey = async () => {
    try {
      setLoading(true);
      await registerPasskey(userData, "ORG");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const stdData =
    userData.students &&
    userData.students.map((item, index) => {
      return (
        <div
          className={`bg-secondary grid grid-cols-7 m-2 place-items-center border border-border text-textSecondary p-3 ${
            index + 1 === userData.students.length && "rounded-b-lg"
          }`}
          key={item.$id}
        >
          <div>{index + 1}</div>
          <div>{item.rollNumber}</div>
          <div>{item.$id}</div>
          <div>{item.firstName + " " + item.lastName}</div>
          <div>{item.email}</div>
          <div>{item.phoneNumber}</div>
          <div>0</div>
        </div>
      );
    });

  return (
    <div className="hidden lg:block col-span-5">
      {!userData.passKey && (
        <div className="bg-secondary m-2 p-3 border rounded-lg border-border flex justify-between items-center">
          <p className="text-textPrimary">
            Passkey not registered yet! You haven't set up your passkey. Please
            register a passkey to proceed with start taking attendance.
          </p>
          {userData.$id && (
            <button
              className="bg-accent p-3 rounded-lg text-textPrimary flex justify-center items-center gap-1 min-w-[200px]"
              onClick={registerOrgPasskey}
              disabled={!userData.$id}
            >
              {loading ? (
                <Loader2 className="animate-spin text-textPrimary" />
              ) : (
                <>
                  <span>
                    <Fingerprint color="white" />
                  </span>
                  <span>Register Passkey</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className="flex justify-between items-center text-textPrimary px-3 pt-2">
        <p className="text-xl font-bold">Registered Students</p>
        <p>Total: {userData.students && userData.students.length}</p>
      </div>

      {userData.students && userData.students.length === 0 ? (
        <p className="text-center text-textSecondary mt-10">
          No students have registered yet
        </p>
      ) : (
        <>
          <div className="bg-secondary grid grid-cols-7 m-2 place-items-center font-bold text-textPrimary underline border border-border rounded-t-lg p-3">
            <div>Serial</div>
            <div>Student Roll Number</div>
            <div>Student UID</div>
            <div>Student Name</div>
            <div>Student Email</div>
            <div>Student Phone Number</div>
            <div>Total Attendance</div>
          </div>

          <div>{stdData}</div>
        </>
      )}
    </div>
  );
};

export default MainPanel;
