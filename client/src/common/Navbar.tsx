import NavbarTitleLogo from "@/components/NavbarTitleLogo";
import ThemeSwitch from "@/components/ThemeSwitch";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  Switch,
  Typography,
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  BranchesOutlined,
  LogoutOutlined,
  LinkOutlined
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
        setVersion(jsonRes.latestTag);
      })
      .catch((error) => {
        console.log("error", error);
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
      console.log(JSON.stringify(response));
      if (response.status === 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log("   logout error   ", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "email",
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

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <NavbarTitleLogo />
      <Space size={"small"} align="center">
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
            <Dropdown
              menu={{
                items: [
                  ...(!isAdminRoute
                    ? [
                        {
                          key: "feedback-switch",
                          label: (
                            <Row justify={"space-between"} align={"middle"}>
                              <Space>
                                <Typography.Text>
                                  Feedback enable:
                                </Typography.Text>
                                <Switch
                                  size={"small"}
                                  defaultValue={showFeedbackBtn}
                                  onChange={(value: boolean)=> setShowFeedbackBtn(value)}
                                />
                              </Space>
                            </Row>
                          ),
                        },
                      ]
                    : []),
                    {
                      key: 'references',
                      label: (
                        <Typography.Link href="https://www.postgresqltutorial.com/" target="_blank">
                            <Row justify={"space-between"} align={"middle"}>
                            References <LinkOutlined />
                            </Row>
                        </Typography.Link>)
                    }
                ],
              }}
              trigger={["click"]}
            >
              <Button type="text" icon={<SettingOutlined />} />
            </Dropdown>
            <Dropdown menu={{ items }} trigger={["click"]}>
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
                      src={
                        (loggedInUser as any)?.picture ||
                        JSON.parse(localStorage.getItem("userProfile") ?? "{}")
                          ?.picture
                      }
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
