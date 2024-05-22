import {
  App,
  Button,
  Card,
  Form,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { token } = useParams();

  const handlePasswordReset = async (values: any) => {
    const { newPassword, confirmNewPassword } = values;

    if (newPassword !== confirmNewPassword) {
      console.log("passwords do not match");
      return;
    }

    const body = {
      newPassword: newPassword,
    };

    try {
      const updatedUserDetails = await fetch(
        `/api/v1/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const res = await updatedUserDetails.json();

      if (res.status === 200) {
        resetPasswordForm();
        navigate('/login');
        notification.success({
          message: res.message,
          placement: "bottomRight",
          duration: 3,
        });
      } else {
        resetPasswordForm();
        notification.error({
          message: res?.message,
          placement: "bottomRight",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Error while updating user ", error);
      notification.error({
        message: `${error?.message}`,
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  const resetPasswordForm = () => {
    form.resetFields();
  };

  return (
    <Layout className="w-full h-screen d-flex justify-center align-middle">
      <Row justify={"center"} align={"middle"}>
        <Title
          level={3}
          className="flex justify-center align-middle mt-4 mb-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
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
                Reset Password
              </Title>
            </Row>
          </>
        }
      >
        <div className="mt-4">
          <Form
            className="w-full flex flex-col justify-center mt-4"
            layout="vertical"
            variant="filled"
            style={{ maxWidth: 600 }}
            size="middle"
            onFinish={handlePasswordReset}
            form={form}
          >
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Confirm new password"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Please fill this field" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {"Sumbit"}
                </Button>
                <Button htmlType="button" onClick={resetPasswordForm}>
                  {"Reset"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </Layout>
  );
};

export default ResetPassword;
