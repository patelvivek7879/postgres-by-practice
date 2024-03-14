import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  FloatButton,
  Form,
  Input,
  Layout,
  MenuProps,
  Popover,
  Row,
  Space,
  Switch,
  Tooltip,
  Typography,
  notification,
} from "antd";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import QuestionsComponent from "@/components/QuestionsComponent";
import ResultComponent from "@/components/ResultComponent";
import AceEditorComponent from "@/components/AceEditorComponents";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendOutlined, SettingOutlined } from "@ant-design/icons";
import Loading from "@/common/Loading";
import Navbar from "@/common/Navbar";
import FooterComponent from "@/components/FooterComponent";

const { Header, Content } = Layout;

const Home = ({ setThemeVal, loggedInUser }: any) => {
  const [sizesParent, setSizesParent] = useState([1, 1, 200]);
  const [sizes, setSizes] = useState([300, "40%", "auto"]);
  const [result, setResult] = useState(null);
  const [showFeedbackBtn, setShowFeedbackBtn] = useState(true);

  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/version")
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setVersion(jsonRes.latestTag);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setVersion(null);
      });
  }, []);

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
            notification.success({
              message: "Feedback sent successfully",
              placement: "topRight",
              duration: 3,
            });
          }else if(resJson.status === 429) {
            notification.error({
              message: resJson.message,
              placement: "topRight",
              duration: 3,
            });
          }else{
            throw new Error(resJson)
          }
          setSending(false);
        } catch (error) {
          console.log(" Failed to send feedback ", error);
          setSending(false);
          notification.error({
            message: error as any,
            placement: "topRight",
            duration: 3,
          });
        }
      }
    } catch (error) {
      console.log("Failed to validate values : ", error);
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
    <Layout 
      style={{ minHeight: "calc(100vh)" }}
    >
      {showFeedbackBtn ? (
        <Popover
          style={{ marginRight: 24 }}
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
                    {()=>(<Button
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
                    </Button>)}
                  </Form.Item>
                </Space>
              </Form>
            </div>
          }
        >
          <Tooltip title={"Drop feedback"} placement="left">
            <FloatButton
              // rootClassName="feedback-btn"
              type="primary"
              style={{ marginRight: "50px" }}
            />
          </Tooltip>
        </Popover>
      ) : null}
      <Navbar setThemeVal={setThemeVal} loggedInUser={loggedInUser} isAdminRoute={false} />
      <Layout className="w-full h-full">
        <Sidebar loggedInUser={loggedInUser}/>
        <Layout
          className="w-full"
          style={{
            height: "calc(100vh-48px)",
          }}
        >
          <Content>
          <SplitPane
            split="vertical"
            sizes={sizes}
            onChange={setSizes}
            sashRender={() => {
              return (
                <Divider
                  type="vertical"
                  style={{ height: "100%", margin: 2 }}
                />
              );
            }}
            resizerSize={4}
          >
            <Pane minSize={"30%"} maxSize={"40%"}>
              <QuestionsComponent />
            </Pane>

            <Pane minSize={50}>
              <SplitPane
                split="horizontal"
                sizes={sizesParent}
                onChange={setSizesParent}
                sashRender={() => {
                  return (
                    <Divider
                      type="horizontal"
                      style={{ height: "100%", margin: 2 }}
                    />
                  );
                }}
                resizerSize={4}
              >
                <Pane minSize={400} maxSize={"80%"}>
                  <AceEditorComponent setResult={setResult} />
                </Pane>
                <Pane minSize={200}>
                  <ResultComponent result={result} />
                </Pane>
              </SplitPane>
            </Pane>
          </SplitPane>
          </Content>
          <FooterComponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
