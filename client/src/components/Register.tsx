import { Button, Card, Divider, Form, Input, Layout, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const googleLoginHandler = () => {
      window.location.href = "http://localhost:5000/api/v1/auth/google";
    };

  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
      <Card className="ml-auto mr-auto min-w-96 min-h-200" title={
        <Title level={5} className="flex justify-center mt-2">
          Pratice Postgres
        </Title>
      }>
        <Button
            className="google-login-form-button"
            onClick={() => {
              googleLoginHandler();
            }}
            icon={<GoogleOutlined />}
          >
            Sign up with Google
          </Button>
          <Divider>
            <Typography.Text type="secondary">OR</Typography.Text>
          </Divider>
        <Form
          form={form}
          layout={"vertical"}
          onFinish={(values) => console.log(values)}
          id="form-signup"
        >
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Space className="flex justify-center align-middle">
            <>
            Already Registered? 
            </>
        <Button className="m-0 pl-0" type="link" size="small" onClick={()=> navigate('/login')}>
            Sign in
        </Button>
        </Space>
        
      </Card>
    </Layout>
  );
};

export default Register;
