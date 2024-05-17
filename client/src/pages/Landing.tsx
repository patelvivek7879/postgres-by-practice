import { Space, Button, Typography, Layout, Switch, Row, Col, Carousel, Image, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import FooterComponent from "@/components/FooterComponent";
import Navbar from "@/common/Navbar";
import { useAuthContext } from "@/AuthProvider";
import React from "react";
import CImg1 from "../assets/c-1.png";

const { Content } = Layout;
const { Title, Text } = Typography;

const Landing = ({ setThemeVal }: any) => {
  const navigate = useNavigate();

  const { loggedInUser }: any = useAuthContext();

  return (
    <>
      <Navbar
        setThemeVal={setThemeVal}
        loggedInUser={loggedInUser}
        isAdminRoute={false} 
        setShowFeedbackBtn={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } 
        showFeedbackBtn={false}      
      />
      <Layout>
        <Content
          hasSider={false}
          className="w-full"
          style={{ height: `calc(100vh - ${64 + 45}px)` }}
        >
          <Row className="w-full h-full">
            <Col span={8} offset={2} className="flex mt-24">
              <Space direction="vertical">
                <Title>Welcome to Practice Postgres!</Title>
                <Text style={{ fontSize: 18, fontWeight: 200 }}>
                  Are you ready to embark on an exciting journey into the world
                  of PostgreSQL? Look no further! Practice Postgres is your
                  ultimate destination for mastering PostgreSQL, the powerful
                  open-source relational database management system trusted by
                  millions of developers worldwide.
                </Text>
                <Title level={4}>Practice Postgres FREE</Title>
                <Button
                  onClick={() => {
                    loggedInUser ? navigate("/home") : navigate("/login");
                  }}
                >
                  Get Started
                  <ArrowRightOutlined />
                </Button>
              </Space>
            </Col>
            <Col span={1} flex={"0 0 1%"}>
                  <Divider type="vertical" className="m-0 h-full"/>
            </Col>
            <Col span={13} style={{ height: '100%', backgroundColor: '#91d5ff' }} className="flex flex-col justify-center">
              <Carousel className="p-8" autoplay>
                <div>
                  <Image src={CImg1} alt="image-1" preview={false}/>
                </div>
                <div>
                <Image src={CImg1} alt="image-2" preview={false}/>
                </div>
                <div>
                <Image src={CImg1} alt="image-3" preview={false}/>
                </div>
              </Carousel>
            </Col>
          </Row>
        </Content>
      </Layout>
      <FooterComponent />
    </>
  );
};

export default Landing;
