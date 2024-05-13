import { useEffect, useState } from "react";
import {
  Card,
  Layout,
  Progress,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from "antd";
import { CodeSandboxOutlined, StockOutlined } from "@ant-design/icons";
import React from "react";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ loggedInUser }: any) => {
  const [progress, setProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { practice, theory }: { practice: number, theory: number } = loggedInUser;

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("userProfile") ?? "{}").progress;
    setProgress(p ?? loggedInUser?.progress);
  }, [localStorage.getItem("userProfile")]);

  return (
    <Sider
      theme={
        localStorage.getItem("prefferedTheme") === "dark" ? "dark" : "light"
      }
      width={280}
      collapsible
      className="d-flex"
      onCollapse={(collapsed: any, type: any) => {
        setIsSidebarCollapsed(collapsed);
      }}
    >
      <Space direction="vertical" className="w-full p-4">
        {/* <Title level={5}>Details</Title>
        <Divider className="m-0"/> */}
        {!isSidebarCollapsed ? (
          <Card title="Progress" size="small">
            <Progress type="line" percent={ progress || Math.floor((6/14)*100)} />
          </Card>
        ) : (
          <Card size="small">
            <Tooltip title={"Progress"}>
            <StockOutlined className="flex justify-center" />
            </Tooltip>
          </Card>
        )}
        {!isSidebarCollapsed ? (
          <Card title="Modules" size="small">
            <Space size={56}>
            <Statistic title={<Text>Practice</Text>} value={practice} suffix="/ 10" valueStyle={{ fontSize: 18}} />
            <Statistic title={<Text>Theory</Text>} value={theory} suffix="/ 4" valueStyle={{ fontSize: 18}}/>
            </Space>
          </Card>
        ) : (
          <Card size="small">
            <Tooltip title={"Modules"}>
            <CodeSandboxOutlined className="flex justify-center"/>
            </Tooltip>
          </Card>
        )}
      </Space>
    </Sider>
  );
};

export default Sidebar;
