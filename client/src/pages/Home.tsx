import React from "react";
import {
  App,
  Button,
  Col,
  Divider,
  FloatButton,
  Form,
  Input,
  Layout,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import QuestionsComponent from "@/components/QuestionsComponent";
import ResultComponent from "@/components/ResultComponent";
import AceEditorComponent from "@/components/AceEditorComponents";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import Loading from "@/common/Loading";
import Navbar from "@/common/Navbar";
import FooterComponent from "@/components/FooterComponent";
import { useAuthContext } from "@/AuthProvider";
import { useProgressContext } from "@/providers/ProgressProvider";

const { Content } = Layout;

const Home = ({ setThemeVal }: any) => {
  const { notification } = App.useApp();
  const [result, setResult] = useState(null);
  const [showFeedbackBtn, setShowFeedbackBtn] = useState(true);

  const { loggedInUser }: any = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

  const { moduleProgress }: any = useProgressContext();

  const practiceModuleProgress =
    moduleProgress &&
    Object.values(moduleProgress).reduce((acc: number, current: any) => {
      if (typeof current === "number") {
        return acc + current;
      } else {
        return 0;
      }
    }, 0);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!loggedInUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loggedInUser]);

  const sendFeedback = async () => {
    setSending(true);
    try {
      const values = form.validateFields();
      if (values) {
        const { message } = await values;
        const feedbackBody = {
          time: Date.now(),
          message: message,
          from: loggedInUser.email,
        };
        try {
          const res = await fetch("/api/v1/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackBody),
          });

          const resJson = await res.json();

          if (resJson.status === 200) {
            setOpen(false);
            notification.success({
              message: "Feedback sent successfully",
              placement: "bottomRight",
              duration: 3,
            });
          } else if (resJson.status === 429) {
            notification.error({
              message: resJson.message,
              placement: "topRight",
              duration: 3,
            });
          } else {
            throw new Error(resJson);
          }
          setSending(false);
        } catch (error) {
          setSending(false);
          notification.error({
            message: error as any,
            placement: "topRight",
            duration: 3,
          });
        }
      }
    } catch (error) {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading iconType="3Quarters" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "calc(100vh)" }}>
      {showFeedbackBtn ? (
        <Popover
          style={{ marginRight: 24 }}
          open={open}
          overlayClassName="feedback-popover"
          trigger={"click"}
          title={
            <Typography.Title level={5} className="mt-0">
              Feedback
            </Typography.Title>
          }
          content={
            <div style={{ width: 300, height: 250 }}>
              <Form form={form} onFinish={() => sendFeedback()}>
                <Space size={"middle"} direction="vertical" className="w-full">
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your feedback!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={7}
                      disabled={sending}
                      maxLength={300}
                      showCount
                    />
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        className="w-full"
                        icon={
                          sending ? (
                            <Loading iconType="normal" iconSize={14} />
                          ) : (
                            <SendOutlined />
                          )
                        }
                        htmlType="submit"
                        disabled={
                          sending ||
                          !form.isFieldsTouched(true) ||
                          !!form
                            .getFieldsError()
                            .filter(({ errors }) => errors.length).length
                        }
                      >
                        {sending ? `Sending...` : `Send`}
                      </Button>
                    )}
                  </Form.Item>
                </Space>
              </Form>
            </div>
          }
          // open={false} // on send feedback will close the popover
        >
          <Tooltip title={"Drop feedback"} placement="left">
            <FloatButton
              type="primary"
              style={{ marginRight: "50px" }}
              onClick={() => setOpen(!open)}
            />
          </Tooltip>
        </Popover>
      ) : null}
      <Navbar
        setThemeVal={setThemeVal}
        loggedInUser={loggedInUser}
        isAdminRoute={false}
        setShowFeedbackBtn={setShowFeedbackBtn}
        showFeedbackBtn={showFeedbackBtn}
      />
      <Layout className="w-full h-full">
        <Sidebar
          loggedInUser={loggedInUser}
          practiceModuleProgress={practiceModuleProgress}
        />
        <Layout className="w-full h-full">
          <Content
            style={{
              height: `calc(100vh - 110px)`,
            }}
          >
            <Row>
              <Col span={10} className="h-full">
                <QuestionsComponent />
              </Col>
              <Col span={1} flex={"none"}>
                <Divider type="vertical" className="w-0 h-full m-0" />
              </Col>
              <Col span={13} style={{ height: `calc(100vh - 160px)` }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {/* <Col span={24}> */}
                  <AceEditorComponent setResult={setResult} />
                  {/* </Col> */}
                  <Divider className="m-0" />
                  {/* <Col span={24}> */}
                  <ResultComponent result={result} />
                  {/* </Col> */}
                </Space>
              </Col>
            </Row>
          </Content>
          <FooterComponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
