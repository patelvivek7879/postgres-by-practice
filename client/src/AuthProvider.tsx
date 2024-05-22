import React, {
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
          location.pathname !== "/" && !location?.pathname.includes('reset-password')
        ) {
          navigate("/");
        }
        localStorage.setItem("userProfile", JSON.stringify(jsonRes?.user));
        setLoggedInUser(jsonRes.user);
        const {new_user: newUser, username}: any = jsonRes.user;
        if(newUser){
          navigate(`/${username}/settings`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLoggedInUser();
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