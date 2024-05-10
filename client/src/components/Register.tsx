import {
  App,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {notification} = App.useApp();

  const googleLoginHandler = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/api/v1/auth/google`;
  };

  const localStrategySignUp = async (values: any) => {
    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 401) {
        notification.error({
          message: "Unauthorized",
          placement: "bottomRight",
          duration: 3,
        });
        form.resetFields();
        navigate("/login");
        return;
      }

      const jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        navigate("/");
        notification.success({
          message: "Login successful",
          placement: "bottomRight",
          duration: 3,
        });
      } else {
        notification.error({
          message: "Error",
          description: jsonResponse.message,
          placement: "bottomRight",
          duration: 3,
        });
        navigate("/login");
      }
    } catch (err: any) {
      console.log(err);
      form.resetFields();
      notification.error({
        message: "Error",
        description: err.message,
        placement: "bottomRight",
        duration: 3,
      });
    }
  };


  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
       <Row justify={"center"} align={"middle"}>
        <Title level={3} className="flex justify-center align-middle mt-4 mb-0 cursor-pointer" onClick={()=> navigate("/")}>
          Practice Postgres
        </Title>
      </Row>
      <Card
        className="ml-auto mr-auto min-w-96 min-h-200"
        title={
          <>
            <Title level={5} className="flex justify-center mt-2">
              Sign Up
            </Title>
          </>
        }
      >
        <Button
          className="google-login-form-button"
          onClick={() => {
            googleLoginHandler();
          }}
          icon={<GoogleOutlined />}
        >
          Continue with Google
        </Button>
        <Divider>
          <Typography.Text type="secondary">OR</Typography.Text>
        </Divider>
        <Form
          form={form}
          layout={"vertical"}
          onFinish={(values) => localStrategySignUp(values)}
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
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Space className="flex justify-center align-middle">
          <>Already Registered?</>
          <Button
            className="m-0 pl-0"
            type="link"
            size="small"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </Space>
      </Card>
    </Layout>
  );
};

export default Register;
