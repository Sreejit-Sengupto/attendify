import React from "react";
import { useUserContext } from "../../../providers/UserProvider";
import { Link } from "react-router-dom";
import { avatars } from "../../../appwrite/config";
import { Mail, MapPin, Phone, Pin } from "lucide-react";
import PasskeyNotification from "../../../components/passkey-notification";
import { registerPasskey } from "../../../utils/webauthn";

const MainPanel = () => {
  const { userData } = useUserContext();
  const [loading, setLoading] = React.useState(false);

  const registerStdPasskey = async () => {
    try {
      setLoading(true);
      await registerPasskey(userData, "STD");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const organisations =
    userData.organisation &&
    userData.organisation.map((item) => {
      return (
        <OrgDetailCard
          key={item.$id}
          orgCode={item.$id}
          orgName={item.name}
          orgCity={item.city}
          orgEmail={item.email}
          orgPhone={item.phoneNumber}
        />
      );
    });

  return (
    <div className="flex flex-col gap-5 p-3">
      <PasskeyNotification
        userData={userData}
        category={"STD"}
        clickHandler={registerStdPasskey}
        loading={loading}
      />
      <h1 className="text-2xl text-textPrimary font-medium">
        Your Organisations
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {organisations}
      </div>
    </div>
  );
};

const OrgDetailCard = ({ orgName, orgCode, orgCity, orgEmail, orgPhone }) => {
  const avatar = avatars.getInitials(orgName);

  return (
    <div className="w-full min-h-[356px] border border-border bg-secondary p-3 flex flex-col justify-start items-center gap-3 rounded-lg">
      <div className="text-textPrimary flex justify-around items-center gap-2 w-full">
        <img
          src={avatar}
          alt="Organisation avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p>{orgName}</p>
        <p className="text-xs bg-accent p-3 rounded-lg text-textPrimary ml-auto">
          {orgCode}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-6 text-textSecondary mt-12 px-3">
        <p className="w-full flex justify-between items-center gap-1">
          <span>
            <Mail color="#FC356C" />
          </span>
          <span>{orgEmail}</span>
        </p>
        <p className="w-full flex justify-between items-center gap-1">
          <span>
            <Phone color="#FC356C" />
          </span>
          <span>{orgPhone}</span>
        </p>
        <p className="w-full flex justify-between items-center gap-1">
          <span>
            <MapPin color="#FC356C" />
          </span>
          <span>{orgCity}</span>
        </p>
      </div>
      <Link
        to={"#"}
        className="bg-accent p-3 rounded-lg text-textPrimary w-full text-center mt-auto"
      >
        Show Details
      </Link>
    </div>
  );
};

export default MainPanel;
