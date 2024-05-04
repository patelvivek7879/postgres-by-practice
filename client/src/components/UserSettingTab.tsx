import { useAuthContext } from "@/AuthProvider";
import {
  Input,
  DatePicker,
  Space,
  Button,
  Form,
  Divider,
  Dropdown,
  Row,
  Switch,
  Typography,
  Tooltip,
  Card,
} from "antd";
import { LinkOutlined, SettingOutlined, InfoOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserSettingTab = () => {
  const { loggedInUser }: any = useAuthContext();

  return (
    <div className="p-4" style={{ maxHeight: 600, height: 480, overflowY: 'scroll', scrollBehavior: "smooth", scrollbarColor: '#bfbfbf transparent', scrollbarWidth: 'thin'}}>
      <Divider className="m-0">
        <Text type="secondary">Change Password</Text>
      </Divider>
      <div className="w-full flex justify-center">
        <Form
          className="w-full flex flex-col justify-center mt-4"
          //   {...formItemLayout}
          layout="vertical"
          variant="filled"
          style={{ maxWidth: 600 }}
          size="middle"
        >
          <Form.Item label="Current password" name="currentPassword"  rules={[{ required: true, message: 'Please fill this field' }]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="New password" name="newPassword" rules={[{required: true, message: 'Please fill this field'}]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Confirm new password" name="confirmNewPassword" rules={[{required: true, message: 'Please fill this field'}]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Sumbit
              </Button>
              <Button htmlType="button">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Divider className="m-0">
        <Text type="secondary">Change Preferences</Text>
      </Divider>
      <div className="flex flex-col justify-center mt-4" style={{ width: 600}}>
        <Row justify={"space-between"} align={"middle"}>
          <Space style={{marginLeft: '28%'}}>
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

      <div className="w-full flex flex-col justify-center mt-4" style={{ width: 600}}>
      <Space style={{marginLeft: '28%'}}>
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
