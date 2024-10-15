// import React from "react";
// import { avatars } from "../appwrite/config";
// import { useUserContext } from "../providers/UserProvider";

// import { KeyRound, Mail, Menu, PhoneCall } from "lucide-react";

// import { Button, Drawer } from "@mui/material";

// const AdminRightPanel = () => {
//   const [state, setState] = React.useState(false);

//   const { userData } = useUserContext();
//   const avatar = userData.name && avatars.getInitials(userData.name);

//   const copyOrgId = () => {
//     navigator.clipboard.writeText(userData.$id);
//     alert("Org-ID copied to clipboard");
//   };

//   const toggleDrawer = () => setState((prev) => !prev);

//   return (
//     <>
//       <Button onClick={toggleDrawer}>
//         <Menu color="#FC356C" size={30} />
//       </Button>
//       <Drawer anchor="right" open={state} onClose={toggleDrawer}>
//         <div className="w-[350px] flex flex-col justify-around items-center gap-2 p-5 bg-[#1C1D20] font-poppins shadow-2xl border-l border-l-border text-textPrimary h-full">
//           <div className="flex flex-col gap-1 items-center justify-center">
//             <img
//               src={avatar}
//               alt="User avatar"
//               width={150}
//               height={150}
//               className="rounded-full bg-white border-4 border-textPrimary"
//             />
//             <p className="text-xl font-semibold">
//               {userData.name && userData.name}
//             </p>
//           </div>

//           <div className="flex flex-col justify-center items-start gap-4 my-5">
//             <button
//               className="flex justify-center items-center gap-1 bg-accent text-textPrimary p-3 rounded-lg"
//               onClick={copyOrgId}
//             >
//               <span>
//                 <KeyRound />
//               </span>
//               <span>{userData.$id && userData.$id}</span>
//             </button>

//             <p className="flex justify-center items-center gap-1 border-b-2 border-border">
//               <span>
//                 <Mail />
//               </span>
//               <span>{userData.email && userData.email}</span>
//             </p>

//             <p className="flex justify-center items-center gap-1 border-b-2 border-border">
//               <span>
//                 <PhoneCall />
//               </span>
//               <span>{userData.phoneNumber && userData.phoneNumber}</span>
//             </p>
//           </div>

//           <div className="flex flex-col justify-center items-start gap-1">
//             <button className="bg-accent p-3 rounded-t-lg text-textPrimary min-w-[220px]">
//               Update Email
//             </button>
//             <button className="bg-accent p-3 text-textPrimary min-w-[220px]">
//               Update Phone Number
//             </button>
//             <button className="bg-accent p-3 rounded-b-lg text-textPrimary min-w-[220px]">
//               Change Password
//             </button>
//           </div>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default AdminRightPanel;

// src/components/AdminRightPanel.jsx

import React, { useState } from "react";
import { avatars } from "../appwrite/config";
import { useUserContext } from "../providers/UserProvider";
import { KeyRound, Mail, Menu, PhoneCall } from "lucide-react";
import { Button, Drawer } from "@mui/material";
import UpdateInput from "./updateInput"; // Import the modal component

const AdminRightPanel = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [modalType, setModalType] = useState(null); // For controlling which modal to open
  const { userData } = useUserContext();
  const avatar = userData.name && avatars.getInitials(userData.name);

  const copyOrgId = () => {
    navigator.clipboard.writeText(userData.$id);
    alert("Org-ID copied to clipboard");
  };

  const toggleDrawer = () => setDrawerState((prev) => !prev);

  const openModal = (type) => {
    setModalType(type); // Set the type (email, phoneNumber, password) for modal
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
  };

  return (
    <>
      <Button onClick={toggleDrawer}>
        <Menu color="#FC356C" size={30} />
      </Button>
      <Drawer anchor="right" open={drawerState} onClose={toggleDrawer}>
        <div className="w-[350px] flex flex-col justify-around items-center gap-2 p-5 bg-[#1C1D20] font-poppins shadow-2xl border-l border-l-border text-textPrimary h-full">
          <div className="flex flex-col gap-1 items-center justify-center">
            <img
              src={avatar}
              alt="User avatar"
              width={150}
              height={150}
              className="rounded-full bg-white border-4 border-textPrimary"
            />
            <p className="text-xl font-semibold">
              {userData.name && userData.name}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start gap-4 my-5">
            <button
              className="flex justify-center items-center gap-1 bg-accent text-textPrimary p-3 rounded-lg"
              onClick={copyOrgId}
            >
              <span>
                <KeyRound />
              </span>
              <span>{userData.$id && userData.$id}</span>
            </button>

            <p className="flex justify-center items-center gap-1 border-b-2 border-border">
              <span>
                <Mail />
              </span>
              <span>{userData.email && userData.email}</span>
            </p>

            <p className="flex justify-center items-center gap-1 border-b-2 border-border">
              <span>
                <PhoneCall />
              </span>
              <span>{userData.phoneNumber && userData.phoneNumber}</span>
            </p>
          </div>

          <div className="flex flex-col justify-center items-start gap-1">
            <button
              className="bg-accent p-3 rounded-t-lg text-textPrimary min-w-[220px]"
              onClick={() => openModal("email")} // Open modal for email
            >
              Update Email
            </button>
            <button
              className="bg-accent p-3 text-textPrimary min-w-[220px]"
              onClick={() => openModal("phoneNumber")} // Open modal for phone number
            >
              Update Phone Number
            </button>
            <button
              className="bg-accent p-3 rounded-b-lg text-textPrimary min-w-[220px]"
              onClick={() => openModal("password")} // Open modal for password
            >
              Change Password
            </button>
          </div>
        </div>
      </Drawer>

      {/* The modal for updating details */}
      {modalType && (
        <UpdateInput
          type={modalType} // Pass the type (email, phoneNumber, or password)
          open={!!modalType} // Only open if modalType is set
          handleClose={closeModal} // Function to close the modal
          userData={userData} // Pass user data
        />
      )}
    </>
  );
};

export default AdminRightPanel;

