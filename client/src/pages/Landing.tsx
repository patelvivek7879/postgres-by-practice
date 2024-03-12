import { Space, Button, Typography, Layout, Switch, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightOutlined
} from "@ant-design/icons";
import ThemeSwitch from "@/components/ThemeSwitch";
import FooterComponent from "@/components/FooterComponent";
import NavbarTitleLogo from "@/components/NavbarTitleLogo";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Landing = ({setThemeVal}: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <NavbarTitleLogo />
        <Space align="center">
         <ThemeSwitch setThemeVal={setThemeVal}/>
          <Button type="text" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
          <Button type="primary" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </Space>
      </Header>
      <Layout>
      <Content
        hasSider={false}
        className="w-full"
        style={{ height: `calc(100vh - ${64 + 84}px)` }}
      >
        <Row className="w-full h-full">
          <Col span={8} offset={2} className="flex mt-24">
            <Space direction="vertical">
            <Title>
            Welcome to Practice Postgres!
            </Title>
            <Text style={{fontSize: 18, fontWeight: 200}}>
            Are you ready to embark on an exciting journey into the world of PostgreSQL? Look no further! Practice Postgres is your ultimate destination for mastering PostgreSQL, the powerful open-source relational database management system trusted by millions of developers worldwide.
            </Text>
            <Title level={4}>
            Practice Postgres FREE
            </Title>
            <Button onClick={()=> navigate("/login")}>
                Get Started
                <ArrowRightOutlined />
            </Button>
            </Space>
          </Col>
          <Col span={14} style={{ backgroundColor: 'orangered'}}></Col>
        </Row>
      </Content>
        </Layout>
      <FooterComponent />
    </>
  );
};

export default Landing;