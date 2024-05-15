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
import { CodeSandboxOutlined, StockOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React from "react";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ loggedInUser, practiceModuleProgress }: any) => {
  // const [progress, setProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // const { practice, theory }: { practice: number, theory: number } = loggedInUser;

  // useEffect(() => {
  //   const p = JSON.parse(localStorage.getItem("userProfile") ?? "{}").progress;
  //   setProgress(p ?? loggedInUser?.progress);
  // }, [localStorage.getItem("userProfile")]);

  const progressPercentage = (practiceModuleProgress * 100) / 10;

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
            <Progress type="line" percent={ progressPercentage || 0} />
          </Card>
        ) : (
          <Card size="small">
            <Tooltip title={"Progress"}>
            <StockOutlined className="flex justify-center" />
            </Tooltip>
          </Card>
        )}
        {!isSidebarCollapsed ? (
          <Card title={<Space>
              {'Modules'} 
            <Tooltip title={`Progress only "Practice" section`}>
              <InfoCircleOutlined /> 
            </Tooltip>
          </Space>} size="small">
            <Space size={56}>
            <Statistic title={<Text>Practice</Text>} value={practiceModuleProgress || 0} suffix="/ 10" valueStyle={{ fontSize: 18}} />
            {/* <Statistic title={<Text>Theory</Text>} value={theory || 0} suffix="/ 4" valueStyle={{ fontSize: 18}}/> */}
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
