import { useAuthContext } from "@/AuthProvider";
import {
  Input,
  App,
  Space,
  Button,
  Form,
  Divider,
  Row,
  Switch,
  Typography,
  Tooltip,
  Alert,
} from "antd";
import {
  LinkOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import React from "react";

const { Text } = Typography;

const UserSettingTab = () => {
  const { loggedInUser }: any = useAuthContext();

  const [form] = Form.useForm();
  const {notification} = App.useApp();

  const { new_user: newUser, password } = loggedInUser;


  const handlePasswordUpdate =async  (values: any) =>{

    const { currentPassword, newPassword, confirmNewPassword } = values;

    if(newPassword !== confirmNewPassword){
      console.log("passwords do not match");
      return;
    }

    const body = {
      email: loggedInUser.email,
      currentPassword: currentPassword,
      newPassword: newPassword,
    }

    try {
      const updatedUserDetails = await fetch("/api/v1/users/update", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const res =  await updatedUserDetails.json()

      if(res.status === 200){
        resetPasswordForm();
        notification.success({
          message: res.message,
          placement: "bottomRight",
          duration: 3
        })
      }else{
        resetPasswordForm();
        notification.error({
          message: res?.message,
          placement: "bottomRight",
          duration: 3
        })
      }

    } catch (error) {
     console.error("Error while updating user ", error);  
     notification.error({
      message: `${error?.message}`,
      placement: "bottomRight",
      duration: 3
    }) 
    }

  }

  const resetPasswordForm = () =>{
    form.resetFields()
  }

  return (
    <div
      className="p-4"
      style={{
        maxHeight: 600,
        height: 480,
        overflowY: "scroll",
        scrollBehavior: "smooth",
        scrollbarColor: "#bfbfbf transparent",
        scrollbarWidth: "thin",
      }}
    >
      <Divider className="m-0">
        <Text type="secondary">Change Password</Text>
      </Divider>
      <div className="w-full flex justify-center">
        <Form
          className="w-full flex flex-col justify-center mt-4"
          layout="vertical"
          variant="filled"
          style={{ maxWidth: 600 }}
          size="middle"
          onFinish={handlePasswordUpdate}
          form={form}
        >
          {!newUser && password ? (
            <Form.Item
              label="Current password"
              name="currentPassword"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>
          ) : newUser ? (
            <Alert
              className="mb-4"
              type="warning"
              showIcon
              message="Please update your password to login using email and password"
            />
          ) : null}

          {newUser && password ? (
            <Form.Item
              label="Current password"
              name="currentPassword"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>
          ) : null}

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
            rules={[{ required: true, message: "Please fill this field" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),]}
          >
            <Input.Password style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {"Sumbit"}
              </Button>
              <Button htmlType="button" onClick={resetPasswordForm}>{"Reset"}</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Divider className="m-0">
        <Text type="secondary">Change Preferences</Text>
      </Divider>
      <div className="flex flex-col justify-center mt-4" style={{ width: 600 }}>
        <Row justify={"space-between"} align={"middle"}>
          <Space style={{ marginLeft: "28%" }}>
            <Typography.Text>Feedback enable:</Typography.Text>
            <Switch
            // defaultValue={showFeedbackBtn}
            // onChange={(value: boolean)=> setShowFeedbackBtn(value)}
            />
            <Tooltip title="Enable/disable feedback">
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        </Row>
      </div>

      <Divider className="m-0">
        <Text type="secondary">References</Text>
      </Divider>

      <div
        className="w-full flex flex-col justify-center mt-4"
        style={{ width: 600 }}
      >
        <Space style={{ marginLeft: "28%" }}>
          <Typography.Link
            href="https://www.postgresqltutorial.com/"
            target="_blank"
          >
            References <LinkOutlined />
          </Typography.Link>
        </Space>
      </div>
    </div>
  );
};

export default UserSettingTab;
