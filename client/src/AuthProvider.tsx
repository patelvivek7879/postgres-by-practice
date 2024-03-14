import { isEmpty } from "lodash";
import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./common/Loading";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoggedInUser = async () => {
    fetch("/api/v1/user/profile")
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        if (
          (jsonRes.status === 401 || jsonRes.message === "Unauthorized") &&
          location.pathname !== "/"
        ) {
          navigate("/login");
        }
        localStorage.setItem("userProfile", JSON.stringify(jsonRes?.user));
        setLoggedInUser(jsonRes.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isEmpty(loggedInUser)) fetchLoggedInUser();
  }, []);

  const authContext = {
    loggedInUser: loggedInUser,
    setLoggedInUser: setLoggedInUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading iconType={"3Quarters"} iconSize={48} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;