import { Button, Card, Form, Input, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  
    const [form] = Form.useForm();
    const navigate = useNavigate();

  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
      <Card className="ml-auto mr-auto min-w-96 min-h-200">
        <Title level={5} className="flex justify-center">
          Pratice Postgres
        </Title>
        <Form
          form={form}
          layout={"vertical"}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Card bordered={false} className="flex justify-center shadow-none">
            Already Registered? 
        <Button className="m-0 p-1" type="link" size="small" onClick={()=> navigate('/login')}>
            Sign in
        </Button>
        </Card>
        
      </Card>
    </Layout>
  );
};

export default Register;
