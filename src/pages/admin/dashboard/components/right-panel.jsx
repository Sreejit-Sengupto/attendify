import React from "react";
import { avatars } from "../../../../appwrite/config";
import { useUserContext } from "../../../../providers/UserProvider";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../../../../components/drawer";

import {
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Mail,
  Menu,
  PhoneCall,
} from "lucide-react";

const RightPanel = () => {
  const { userData } = useUserContext();
  const avatar = avatars.getInitials(userData.name);

  const copyOrgId = () => {
    navigator.clipboard.writeText(userData.$id);
    alert("Org-ID copied to clipboard");
  };

  return (
    <>
      <DesktopPanel userData={userData} avatar={avatar} copyOrgId={copyOrgId} />
      <MobilePanel userData={userData} avatar={avatar} copyOrgId={copyOrgId} />
    </>
  );
};

const DesktopPanel = ({ userData, avatar, copyOrgId }) => {
  return (
    <div className="hidden col-span-1 lg:flex flex-col justify-around items-center gap-2 p-5 bg-[#1C1D20] rounded-l-[5rem] font-poppins shadow-2xl border-l border-l-border text-textPrimary">
      <div className="flex flex-col gap-1 items-center justify-center">
        <img
          src={avatar}
          alt="User avatar"
          width={150}
          height={150}
          className="rounded-full bg-white border-4 border-textPrimary"
        />
        <p className="text-2xl font-semibold">{userData.name}</p>
      </div>

      <div className="flex flex-col justify-center items-start gap-4 my-5">
        <button
          className="flex justify-center items-center gap-1 bg-accent text-textPrimary p-3 rounded-lg"
          onClick={copyOrgId}
        >
          <span>
            <KeyRound />
          </span>
          <span>{userData.$id}</span>
        </button>

        <p className="flex justify-center items-center gap-1 border-b-2 border-border">
          <span>
            <Mail />
          </span>
          <span>{userData.email}</span>
        </p>

        <p className="flex justify-center items-center gap-1 border-b-2 border-border">
          <span>
            <PhoneCall />
          </span>
          <span>{userData.phoneNumber}</span>
        </p>
      </div>

      <div className="flex flex-col justify-center items-start gap-1">
        <button className="bg-accent p-3 rounded-t-lg text-textPrimary min-w-[220px]">
          Update Email
        </button>
        <button className="bg-accent p-3 text-textPrimary min-w-[220px]">
          Update Phone Number
        </button>
        <button className="bg-accent p-3 rounded-b-lg text-textPrimary min-w-[220px]">
          Change Password
        </button>
      </div>
    </div>
  );
};

const MobilePanel = ({ userData, avatar, copyOrgId }) => {
  const [show, setShow] = React.useState(false);

  const toggle = () => setShow((prev) => !prev);

  return (
    <div className="lg:hidden w-full">
      <div className="text-textPrimary text-xl">Coming soon...</div>
      {show ? (
        <div className="hidden absolute h-[90dvh] bg-blue-100 w-[60%] rounded-r-[5rem]">
          <button
            className="my-5 glassmorphism p-3 ml-auto block mt-12"
            onClick={toggle}
          >
            <ChevronLeft />
          </button>

          <div>hello</div>
        </div>
      ) : (
        <button className="hidden my-5 glassmorphism p-3" onClick={toggle}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default RightPanel;
