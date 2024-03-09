import { useState } from "react";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, Progress, Row, Space, Tooltip, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const progress = JSON.parse(localStorage.getItem('userProfile') ?? "").progress

  return (
    <Sider
      theme="light"
      trigger={
        <Button
          type="text"
          size="small"
          shape="circle"
          className={collapsed ? `expand-btn` : ""}
          style={{ backgroundColor: "#fff" }}
          icon={
            collapsed ? (
              <Tooltip title={"Expand"} getPopupContainer={()=> document.body} getTooltipContainer={()=> document.body}>
                <RightCircleOutlined color="#f5f5f5" />
              </Tooltip>
            ) : (
              <Tooltip title="Collapse" getPopupContainer={()=> document.body} getTooltipContainer={()=> document.body}>
                <LeftCircleOutlined color="#f5f5f5" />
              </Tooltip>
            )
          }
        />
      }
      style={{height: "100vh", minWidth: '200px'}}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      onCollapse={() => setCollapsed(!collapsed)}
      zeroWidthTriggerStyle={{
        background: "none",
        position: "absolute",
        border: "none",
        ...(!collapsed ? { inset: `64px 180px` } : { inset: `64px -12px` }),
      }}
      className="d-flex flex-column justify-even"
    >
      <Row style={{ height: "100%", width: "100%" }}>
      <Card title={null} size="small" className="w-full">
        <Title level={5}>Progress</Title>
        <Space style={{width: '100%'}} size={'middle'} className="d-flex flex-row justify-center mt-4" >
      <Progress type="circle" percent={progress} size="small"/>
        2 / 30
      </Space>
      </Card>
      </Row>
      {/* <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
        style={{ height: "100%", width: "100%" }}
      /> */}
    </Sider>
  );
};

export default Sidebar;
