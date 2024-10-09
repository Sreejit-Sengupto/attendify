import { CirclePlay, LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUserContext } from "../providers/UserProvider";

const TopBar = ({ category }) => {
  const [loading, setLoading] = React.useState(false);

  const { logout } = useUserContext();

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between items-center p-2 border-b border-b-border bg-primary">
      <div className="flex justify-center items-center gap-1">
        <img
          src={"/android-chrome-256x256.png"}
          alt="Application icon"
          width={60}
          height={60}
        />
        <p className="font-bold lg:text-xl text-textPrimary">Attendify</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        {category === "ORG" ? (
          <Link
            to={"#"}
            className="font-garamond bg-accent text-textPrimary p-3 rounded-md"
          >
            <p>
              <span className="hidden lg:inline">Start Attendance</span>
              <span className="lg:hidden">
                <CirclePlay />
              </span>
            </p>
          </Link>
        ) : null}
        <button
          className="bg-primary p-3 rounded-lg text-textPrimary lg:min-w-[100px]"
          onClick={logoutUser}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-1">
              <Loader className="animate-spin mx-auto" />
            </span>
          ) : (
            <p>
              <span className="hidden lg:inline">Logout</span>
              <span className="lg:hidden">
                <LogOut />
              </span>
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
