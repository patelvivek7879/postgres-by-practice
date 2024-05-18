import { useAuthContext } from "@/AuthProvider";
import Navbar from "@/common/Navbar";
import FooterComponent from "@/components/FooterComponent";
import {
  Button,
  Col,
  Divider,
  Image,
  Layout,
  Row,
  Space,
  Tabs,
  Typography
} from "antd";
import type { TabsProps } from "antd";
import UserProfileTab from "@/components/UserProfileTab";
import UserSettingTab from "@/components/UserSettingTab";
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const { Text } = Typography;
const { Content } = Layout;

const UserProfile = ({ setThemeVal }: any) => {
  const { loggedInUser }: any = useAuthContext();

  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState("profile");

  const items: TabsProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      children: <UserProfileTab />,
    },
    {
      key: "settings",
      label: "Settings",
      children: <UserSettingTab />,
    },
  ];

  const onChange = (e: string) => {
    setActiveKey(e);
    navigate(`/${loggedInUser?.username}/${e}`);
  };

  useEffect(()=>{
    if(location.pathname.endsWith("settings")) setActiveKey('settings');
  },[location ])
  

  return (
    <>
      <Layout style={{ minHeight: "calc(100vh)" }}>
        <Navbar
          setThemeVal={setThemeVal}
          loggedInUser={loggedInUser}
          isAdminRoute={false}
          setShowFeedbackBtn={() => {}}
          showFeedbackBtn={false}
        />
        <Layout className="w-full h-full">
          <Layout className="w-full h-full">
            <Content
              style={{
                height: `calc(100vh - 110px)`,
                width: "1440px",
                minWidth: "1024px",
                overflow: 'auto'
              }}
              className="p-4 ml-auto mr-auto"
            >
              <div className="w-full ml-auto mr-auto" style={{ width: 960 }}>
                <Row className="h-full">
                <Button type="text" icon={ <HomeOutlined />} onClick={()=> navigate(`/home`)}></Button>
                  <Space className="h-full" style={{ width: "100%" }}>
                    <Image
                      width={200}
                      style={{ borderRadius: "50%" }}
                      src={
                        loggedInUser?.picture ||
                        `https://api.dicebear.com/7.x/miniavs/svg?seed=1`
                      }
                      preview={false}
                    />
                    <Divider
                      type="vertical"
                      className="h-full m-2"
                      style={{ height: "190px" }}
                    />
                    <Space direction="vertical">
                      <div className="flex gap-2">
                        <Text strong>{loggedInUser?.name}</Text>
                      </div>
                      <div className="flex gap-2">
                        <Text strong>{loggedInUser?.username}</Text>
                      </div>
                      <div className="flex gap-2">
                        <Text strong>{loggedInUser?.email}</Text>
                      </div>
                    </Space>
                  </Space>
                </Row>
                <Row justify={"center"}>
                  <Col span={24} className="h-full w-full">
                    <Tabs
                      activeKey={activeKey}
                      items={items}
                      onChange={onChange}
                      centered
                      style={{ width: 960 }}
                      className="ml-auto mr-auto"
                    />
                  </Col>
                </Row>
              </div>
            </Content>
            <FooterComponent />
          </Layout>
        </Layout>
      </Layout>
      {/* <Modal
        title="Change Profile Picture"
        open={isOpen}
        footer={<>
        <Row className="flex flex-col">
          <Button type="primary" onClick={()=>{ console.log()}}>Save Photo</Button>
        </Row>
          <Row>
          <Upload {...props} style={{ width: '100%'}}>
            <Button  type="primary">{'Upload Photo'}</Button>
          </Upload>
          </Row>
          </>
        }
        // onOk={() => setIsOpen(false)}
        // onCancel={() => setIsOpen(false)}
      >
        <Row justify={'center'}>
          <Image
            width={200}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            src={
              loggedInUser?.picture ||
              `https://api.dicebear.com/7.x/miniavs/svg?seed=1`
            }
            preview={false}
            onClick={() => setIsOpen(true)}
          />
          <Divider className="m-4"/>
        </Row>
      </Modal> */}
    </>
  );
};

export default UserProfile;
