import React from "react";
import { Fingerprint, Loader2 } from "lucide-react";

const PasskeyNotification = ({ userData, category, clickHandler, loading }) => {
  return (
    userData.$id &&
    !userData.passKey && (
      <div className="bg-secondary m-2 p-3 border rounded-lg border-border flex flex-col lg:flex-row justify-between items-center gap-2">
        <p className="text-textPrimary">
          Passkey not registered yet! You haven't set up your passkey. Please
          register a passkey to proceed with start{" "}
          {category === "ORG" ? "taking" : "signing"} attendance.
        </p>

        <button
          className="bg-accent p-3 rounded-lg text-textPrimary flex justify-center items-center gap-1 min-w-[200px]"
          onClick={clickHandler}
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
      </div>
    )
  );
};

export default PasskeyNotification;
