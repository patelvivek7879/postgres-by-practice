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
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setLoggedInUser }: any = useAuthContext();
  const {notification} = App.useApp();

  const localLogin = async (values: any) => {
    try {
      const response = await fetch("/api/v1/login", {
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
        console.log(jsonResponse);
        localStorage.setItem("userProfile", JSON.stringify(jsonResponse?.user));
        setLoggedInUser(jsonResponse.user);
        navigate("/home");
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

  const googleLoginHandler = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/api/v1/auth/google`;
  };

  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
      <Row justify={"center"} align={"middle"}>
        <Title level={3} className="flex justify-center align-middle mt-4 mb-0" onClick={()=> navigate("/")}>
          Practice Postgres
        </Title>
      </Row>
      <Card
        className="ml-auto mr-auto min-w-96"
        title={
          <>
            <Row justify={"center"} align={"middle"}>
              <Title
                level={5}
                className="flex justify-center align-middle mt-1"
              >
                Sign In
              </Title>
            </Row>
          </>
        }
      >
        <div className="mt-4">
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
            onFinish={(values) => localLogin(values)}
            id="form-login"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email or username!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Space className="flex justify-center" align="center">
            <>Don't have an account?</>
            <Button
              className="m-0 pl-0"
              type="link"
              size="small"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Space>
        </div>
      </Card>
    </Layout>
  );
};

export default Login;
