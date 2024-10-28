import React from "react";
import { useParams } from "react-router-dom";
import { avatars, databases } from "../../../appwrite/config";
import {
  Building,
  House,
  Loader,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  Map,
  Signature,
  Sigma,
  Percent,
} from "lucide-react";
import CustomFieldset from "../../../components/custom-fieldset";
import { useUserContext } from "../../../providers/UserProvider";

const OrgDetail = () => {
  const params = useParams();
  const { userData } = useUserContext();

  const [loading, setLoading] = React.useState(false);
  const [orgData, setOrgData] = React.useState({});

  const fetchOrgDetails = async () => {
    try {
      setLoading(true);
      const result = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        params.orgId
      );

      setOrgData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrgDetails();
  }, []);

  const avatar = avatars.getInitials(orgData.name);

  const parsedAtt =
    userData && userData.attendance && JSON.parse(userData.attendance);
  // const att = orgData.attendance && parsedAtt[orgData.$id].total;
  const att = React.useCallback(() => {
    return parsedAtt && parsedAtt[orgData.$id] && parsedAtt[orgData.$id].total;
  }, [orgData]);

  const percentage = (att() / orgData.classes) * 100;

  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center gap-3 text-textPrimary">
      {loading ? (
        <Loader size={100} color="#FC356C" className="animate-spin"></Loader>
      ) : (
        <>
          <div className="flex justify-center items-center gap-2">
            <img
              src={avatar}
              alt="Organisation logo"
              width={70}
              height={70}
              className="rounded-full"
            />
            <h1 className="text-textPrimary text-2xl font-semibold">
              {orgData.name}
            </h1>
          </div>

          <div className="w-[90%] lg:w-[60%]">
            <CustomFieldset legend={"Attendance Details"}>
              <p className="flex items-center justify-between">
                <span className="flex justify-center items-center gap-1">
                  <Sigma color="#FC356C" />
                  Total Classes
                </span>
                <span>{orgData.classes}</span>
              </p>
              <p className="flex items-center justify-between my-3">
                <span className="flex justify-center items-center gap-1">
                  <Signature color="#FC356C" />
                  Total Attendance
                </span>
                <span>{att()}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex justify-center items-center gap-1">
                  <Percent color="#FC356C" />
                  Percentage
                </span>
                <span
                  className={
                    percentage < 75 ? "text-red-500" : "text-green-500"
                  }
                >
                  {percentage} %
                </span>
              </p>
            </CustomFieldset>
            <CustomFieldset legend={"Contact Details"}>
              <p className="flex items-center justify-between">
                <span className="flex justify-center items-center gap-1">
                  <Mail color="#FC356C" />
                  Email
                </span>
                <span>{orgData.email}</span>
              </p>
              <p className="flex items-center justify-between my-3">
                <span className="flex justify-center items-center gap-1">
                  <Phone color="#FC356C" />
                  Phone Number
                </span>
                <span>{orgData.phoneNumber}</span>
              </p>
            </CustomFieldset>

            <CustomFieldset legend={"Address"}>
              <p className="flex items-center justify-between mb-3">
                <span className="flex justify-center items-center gap-1">
                  <House color="#FC356C" />
                  Address Line 1
                </span>
                <span>{orgData.addressLine1}</span>
              </p>
              <p className="flex items-center justify-between mb-3">
                <span className="flex justify-center items-center gap-1">
                  <Building color="#FC356C" />
                  Address Line 2
                </span>
                <span>{orgData.addressLine2}</span>
              </p>
              <p className="flex items-center justify-between mb-3">
                <span className="flex justify-center items-center gap-1">
                  <MapPin color="#FC356C" />
                  City
                </span>
                <span>{orgData.city}</span>
              </p>
              <p className="flex items-center justify-between mb-3">
                <span className="flex justify-center items-center gap-1">
                  <Map color="#FC356C" />
                  State
                </span>
                <span>{orgData.state}</span>
              </p>
            </CustomFieldset>
          </div>
        </>
      )}
    </div>
  );
};

export default OrgDetail;
