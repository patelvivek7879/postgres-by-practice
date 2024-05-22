import {
    App,
    Button,
    Card,
    Form,
    Input,
    Layout,
    Row,
    Typography,
  } from "antd";
  import { useNavigate } from "react-router-dom";
  import React, { useState } from "react";
  
  const { Title } = Typography;
  
  const ForgotPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { notification } = App.useApp();
  
    const [message, setMessage] = useState({ msg: '', status: 0});


    const forgotPasswordFn = async (values: {[key: string]: string}) =>{
      try{

        const response = await fetch("/api/v1/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const res = await response.json();

        if(res.status === 403){
          setMessage({ msg: res?.message, status: res.status})
          notification.error({
            message: res?.message,
            placement: "bottomRight",
            duration: 3,
          });
        }else{
          setMessage({ msg: res?.message, status: res.status})
        }

      }catch(err: any){
        setMessage('');
        notification.error({
          message: err?.message,
          placement: "bottomRight",
          duration: 3,
        });
      }
    }

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
                  Forget Password
                </Title>
              </Row>
            </>
          }
        >
          <div className="mt-4">
            <Form
              form={form}
              layout={"vertical"}
              onFinish={(values) => forgotPasswordFn(values)}
              id="form-login"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input placeholder="Enter your registered email" />
              </Form.Item>
                { message?.status === 403 ? <Typography.Text type="danger" style={{ fontSize: 12}} className="absolute top-32 p-1 mt-1">
                  {" "}{message?.msg}
                </Typography.Text> : 
                <Typography.Text type="success" style={{ fontSize: 12}} className="absolute top-32 p-1 mt-1">
                  {" "}{message?.msg}
                </Typography.Text>
                }
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mt-2"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Layout>
    );
  };
  
  export default ForgotPassword;
  