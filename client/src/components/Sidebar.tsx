import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Layout,
  Progress,
  Row,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from "antd";
import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ loggedInUser }: any) => {
  const [progress, setProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
            <Progress type="line" percent={progress || 30} />
          </Card>
        ) : (
          <Card size="small">
            <Tooltip title={"Progress"}>
            <AreaChartOutlined className="flex justify-center" />
            </Tooltip>
          </Card>
        )}
        {!isSidebarCollapsed ? (
          <Card title="Modules" size="small">
            <Statistic title="" value={93} suffix="/ 100" />
          </Card>
        ) : (
          <Card size="small">
            <Tooltip title={"Modules"}>
            <PieChartOutlined className="flex justify-center"/>
            </Tooltip>
          </Card>
        )}
      </Space>
    </Sider>
  );
};

export default Sidebar;
