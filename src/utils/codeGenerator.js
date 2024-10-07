import { ID } from "appwrite";

export const generateOrgCode = (orgName) => {
  if (orgName.length > 3) {
    return (
      orgName.substring(0, 3) + ID.unique().substring(ID.unique().length - 3)
    );
  }
  return orgName + ID.unique().substring(ID.unique().length - 3);
};
