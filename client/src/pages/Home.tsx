import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  Typography,
} from "antd";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import {
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import QuestionsComponent from "@/components/QuestionsComponent";
import ResultComponent from "@/components/ResultComponent";
import AceEditorComponent from "@/components/AceEditorComponents";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const { Title } = Typography;
const { Header } = Layout;

const Home = () => {
  const [theme, setTheme] = useState("light");

  const [sizesParent, setSizesParent] = useState([1, 1, 200]);
  const [sizes, setSizes] = useState([300, "40%", "auto"]);

  const [result, setResult] = useState(null);
  const logout = () => {
    console.log("logout function got invoked");
  };

  const changeTheme = () => {
    console.log("current theme");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={logout} type="text" icon={<LogoutOutlined />}>
          Log out
        </Button>
      ),
      disabled: false,
    },
  ];

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <Title level={3} className="mb-0 text-white" style={{ margin: 0 }}>
          PbyP
        </Title>
        <Space size={"small"}>
          <Button
            type="text"
            size={"small"}
            icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
            onClick={changeTheme}
          ></Button>
          <Dropdown menu={{ items }}>
            <Avatar size={24} icon={<UserOutlined />} src={""} />
          </Dropdown>
        </Space>
      </Header>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Sidebar />
        <Layout
          className="m-2 p-4"
          style={{
            backgroundColor: "#fff",
            height: "100vh",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            scrollbarColor: "#f5f5f5 transparent",
          }}
        >
          <SplitPane
            split="vertical"
            sizes={sizes}
            onChange={setSizes}
            sashRender={(_index: number, _active: boolean) => {
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
                sashRender={(_index: number, _active: boolean) => {
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
