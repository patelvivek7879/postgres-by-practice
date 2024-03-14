import { Space, Button, Typography, Layout, Switch, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightOutlined
} from "@ant-design/icons";
import FooterComponent from "@/components/FooterComponent";
import Navbar from "@/common/Navbar";
import { useAuthContext } from "@/AuthProvider";

const { Content } = Layout;
const { Title, Text } = Typography;

const Landing = ({setThemeVal}: any) => {
  const navigate = useNavigate();

  const { loggedInUser }: any = useAuthContext();

  return (
    <>
    <Navbar setThemeVal={setThemeVal} loggedInUser={loggedInUser} isAdminRoute={false} />
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
            <Button onClick={()=> {
                loggedInUser ? navigate("/home") : navigate("/login")
              }}>
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
