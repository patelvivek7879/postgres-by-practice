import React from "react";
import NavbarTitleLogo from "@/components/NavbarTitleLogo";
import ThemeSwitch from "@/components/ThemeSwitch";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Space,
} from "antd";
import {
  UserOutlined,
  BranchesOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from 'lodash';
import { useAuthContext } from "@/AuthProvider";

const { Header } = Layout;

const Navbar = ({
  setThemeVal,
  loggedInUser,
  isAdminRoute = false,
  setShowFeedbackBtn,
  showFeedbackBtn
}: {
  setThemeVal: () => {};
  loggedInUser: any;
  isAdminRoute: boolean;
  setShowFeedbackBtn: (value: boolean)=> void;
  showFeedbackBtn: boolean 
}) => {
  const [version, setVersion] = useState<string | null>(null);
  const navigate = useNavigate();

  const { setLoggedInUser }: any = useAuthContext();

  const fetchVersion = () => {
    fetch("/api/v1/version")
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setVersion(jsonRes?.latestTag || jsonRes.name);
      })
      .catch((error) => {
        setVersion(null);
      });
  };

  useEffect(() => {
    if (!version) fetchVersion();
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("userProfile");
      setLoggedInUser(null);
      const response = await fetch("/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });
      
      if (response.status === 200) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error while logging out ", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "username",
      label: (
        <Space style={{ minWidth: 100 }}>
          <UserOutlined /> {(loggedInUser as any)?.username}
        </Space>
      ),
    },
    {
      key: "logout",
      label: (
        <Space onClick={logout} style={{ minWidth: 100 }}>
          <LogoutOutlined /> {"Log out"}
        </Space>
      ),
      disabled: false,
    },
    {
      type: "divider",
    },
    {
      key: "version",
      label: (
        <Space onClick={logout} style={{ minWidth: 100 }}>
          <BranchesOutlined /> {version}
        </Space>
      ),
      disabled: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if(e.key === 'username'){
      navigate(`/${loggedInUser?.username}/profile`);
    }
  };


  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(232, 232, 232, 0.4)"
      }}
    >
      <NavbarTitleLogo />
      <Space size={"small"} align="center">
        <div className="mt-6">
        <a href="https://www.buymeacoffee.com/patelviveku" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: "36px"}}/>
        </a>
        </div>
        <ThemeSwitch setThemeVal={setThemeVal} />
        {isEmpty(loggedInUser) || !localStorage.getItem('userProfile') ? (
          <>
            <Button type="text" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
            <Button type="primary" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </>
        ) : (
          <>
            <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
              {/* TODO: google image  */}
              {(loggedInUser as any)?.picture ? (
                <Avatar
                  className="cursor-pointer"
                  size={32}
                  src={
                    <img
                      src={(loggedInUser as any)?.picture}
                      alt={"user image"}
                    />
                  }
                />
              ) : (
                <Avatar
                  className="cursor-pointer"
                  size={32}
                  src={
                    <img
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                    />
                  }
                  icon={<UserOutlined size={32} />}
                />
              )}
            </Dropdown>
          </>
        )}
      </Space>
    </Header>
  );
};

export default Navbar;
