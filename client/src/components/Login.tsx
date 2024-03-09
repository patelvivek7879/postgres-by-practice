import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Typography,
  notification,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import queryString from "query-string";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  const googleLoginHandler = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth/google';
    // fetch("/api/v1/auth/google")
      // .then((response1) => {
      //   console.log("r1 -->>",response1);
      //   return response1.json();
      // })
      // .then((response2) => console.log("r2 -->>",response2))
      // .catch();
  };

  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
      <Card className="ml-auto mr-auto min-w-96 min-h-200">
        <Title level={5} className="flex justify-center">
          Pratice Postgres
        </Title>

        <Button
          onClick={() => {
            googleLoginHandler();
          }}
          icon={<GoogleOutlined />}
        >
          Login with Google
        </Button>

        <Form
          form={form}
          layout={"vertical"}
          onFinish={(values) => localLogin(values)}
        >
          <Form.Item
            label="Email or Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email or username!",
              },
            ]}
          >
            <Input placeholder="enter your email or username" />
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
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Card bordered={false} className="flex justify-center shadow-none">
          Don't have an account?
          <Button
            className="m-0 p-1"
            type="link"
            size="small"
            onClick={() => navigate("/register")}
          >
            register
          </Button>
        </Card>
      </Card>
    </Layout>
  );
};

export default Login;
