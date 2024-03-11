import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  FloatButton,
  Form,
  Input,
  Layout,
  MenuProps,
  Popover,
  Row,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import QuestionsComponent from "@/components/QuestionsComponent";
import ResultComponent from "@/components/ResultComponent";
import AceEditorComponent from "@/components/AceEditorComponents";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendOutlined, SettingOutlined } from "@ant-design/icons";
import ThemeSwitch from "@/components/ThemeSwitch";
import NavbarTitleLogo from "@/components/NavbarTitleLogo";

const { Header } = Layout;

const Home = ({ loggedInUser }: any) => {
  const [sizesParent, setSizesParent] = useState([1, 1, 200]);
  const [sizes, setSizes] = useState([300, "40%", "auto"]);

  const [result, setResult] = useState(null);
  const [showFeedbackBtn, setShowFeedbackBtn] = useState(true);

  const navigate = useNavigate();

  const logout = async () => {
    console.log("logout function got invoked");
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
      key: "logout",
      label: (
        <Space onClick={logout} style={{ minWidth: 100 }}>
          <LogoutOutlined /> Log out
        </Space>
      ),
      disabled: false,
    },
  ];

  const avtarPicUrl =
    JSON.parse(localStorage.getItem("userProfile") ?? "{}")?.picture ?? "";

  return (
    <Layout
      style={{ backgroundColor: "#fff", minHeight: "calc(100vh - 64px)" }}
    >
      {showFeedbackBtn ? (
        <Popover
          style={{ marginRight: 24 }}
          overlayClassName="feedback-popover"
          trigger={"click"}
          title={<Typography.Title level={5}>Feedback</Typography.Title>}
          content={
            <div style={{ width: 300, height: 250 }}>
              <Form>
                <Form.Item>
                  <Input.TextArea rows={7} />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="w-full"
                    icon={<SendOutlined />}
                    htmlType="submit"
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          }
        >
          <Tooltip title={"Drop feedback"} placement="left">
            <FloatButton
              style={{ marginRight: "50px" }}
              onClick={() => console.log("onClick")}
            />
          </Tooltip>
        </Popover>
      ) : null}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "#ffffff",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <NavbarTitleLogo />
        <Space size={"small"} align="center">
          <ThemeSwitch />
          <Dropdown
            menu={{
              items: [
                {
                  key: "feedback-switch",
                  label: (
                    <Row justify={"space-between"} align={"middle"}>
                      <Space>
                        <Typography.Text>Feedback enable:</Typography.Text>
                        <Switch
                          size={"small"}
                          value={showFeedbackBtn}
                          onClick={(e) => {
                            setShowFeedbackBtn(e);
                          }}
                        />
                      </Space>
                    </Row>
                  ),
                  disabled: false,
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" ghost icon={<SettingOutlined />} />
          </Dropdown>
          <Dropdown menu={{ items }}>
            {/* TODO: google image  */}
            <Avatar
              size={32}
              src={<img src={avtarPicUrl} />}
              icon={!avtarPicUrl ? <UserOutlined size={32} /> : null}
            />
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sidebar loggedInUser={loggedInUser} />
        <Layout
          className="m-2 p-4"
          style={{
            height: "calc(100vh-64px)",
          }}
        >
          <SplitPane
            split="vertical"
            sizes={sizes}
            onChange={setSizes}
            sashRender={() => {
              return (
                <Divider
                  type="vertical"
                  style={{ height: "100vh", margin: 2 }}
                />
              );
            }}
            resizerSize={4}
          >
            <Pane minSize={"30%"} maxSize={"40%"}>
              <QuestionsComponent />
            </Pane>

            <Pane minSize={50}>
              <SplitPane
                split="horizontal"
                sizes={sizesParent}
                onChange={setSizesParent}
                sashRender={() => {
                  return (
                    <Divider
                      type="horizontal"
                      style={{ height: "100%", margin: 2 }}
                    />
                  );
                }}
                resizerSize={4}
              >
                <Pane minSize={400} maxSize={"80%"}>
                  <AceEditorComponent setResult={setResult} />
                </Pane>
                <Pane minSize={200}>
                  <ResultComponent result={result} />
                </Pane>
              </SplitPane>
            </Pane>
          </SplitPane>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
