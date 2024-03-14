import NavbarTitleLogo from '@/components/NavbarTitleLogo';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space, Switch, Typography, version } from 'antd'
import { SettingOutlined, UserOutlined, BranchesOutlined, LogoutOutlined }  from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({setThemeVal, loggedInUser, isAdminRoute = false}:{setThemeVal: () => {}, loggedInUser: any, isAdminRoute: boolean}) => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
          localStorage.removeItem("userProfile");
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
          <Dropdown
            menu={{
              items: [
                ...!isAdminRoute ? [{
                  key: "feedback-switch",
                  label: (
                    <Row justify={"space-between"} align={"middle"}>
                      <Space>
                        <Typography.Text>Feedback enable:</Typography.Text>
                        <Switch
                          size={"small"}
                        //   disabled={isAdminRoute}
                        />
                      </Space>
                    </Row>
                  ),
                //   disabled: isAdminRoute
                }] : [],
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" icon={<SettingOutlined />} />
          </Dropdown>
          <Dropdown menu={{ items }} trigger={['click']}>
            {/* TODO: google image  */}
            {(loggedInUser as any)?.picture ? (
              <Avatar
                className='cursor-pointer'
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
                className='cursor-pointer'
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
        </Space>
      </Header>
  )
}

export default Navbar;