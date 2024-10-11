import React from "react";
import { useUserContext } from "../../../../providers/UserProvider";
import { registerPasskey } from "../../../../utils/webauthn";

const MainPanel = () => {
  const { userData } = useUserContext();

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
          <div>{item.$id}</div>
          <div>{item.firstName + " " + item.lastName}</div>
          <div>00000000</div>
          <div>{item.email}</div>
          <div>{item.phoneNumber}</div>
          <div>0</div>
        </div>
      );
    });

  return (
    <div className="hidden lg:block col-span-5">
      {!userData.publicKey && (
        <div className="bg-secondary m-2 p-3 border rounded-lg border-border flex justify-between items-center">
          <p className="text-textPrimary">
            Passkey not registered yet! You haven't set up your passkey. Please
            register a passkey to proceed with start taking attendance.
          </p>
          <button
            className="bg-accent p-3 rounded-lg text-textPrimary"
            onClick={() => registerPasskey(userData, "ORG")}
            disabled={!userData.$id}
          >
            Register Passkey
          </button>
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
            <div>Student UID</div>
            <div>Student Name</div>
            <div>Student Roll Number</div>
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
