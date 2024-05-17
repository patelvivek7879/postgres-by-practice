import React from "react";
import { Button, DatePicker, Form, Input, Row, Space } from "antd";
import { useAuthContext } from "@/AuthProvider";

const UserProfileTab = () => {
  const { loggedInUser }: any = useAuthContext();

  const updateUserInfo = async (values: any) =>{
    const { email } = loggedInUser;;
    const body = {
      email,
//       practice: 1, // will add what to update
// progress: 0,
// theory: 1,
      ...values,
    }

    // const updatedUserDetails = await axios.put('/api/v1/users/update', body);
    try {
    const updatedUserDetails = await fetch("/api/v1/users/update", {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await updatedUserDetails.json()
  } catch (error) {
   console.error("Error while updating user ", error);   
  }
  }

  return (
    <div className="w-full flex justify-center pb-3" style={{ maxHeight: 600, height: 480, overflowY: 'scroll', scrollBehavior: "smooth", scrollbarColor: '#bfbfbf transparent', scrollbarWidth: 'thin'}}>
      <Form
        className="w-full flex flex-col justify-center mt-4"
        // {...formItemLayout}
        layout='vertical'
        variant="filled"
        style={{ maxWidth: 600 }}
        size="middle"
        onFinish={(values)=> updateUserInfo(values)}
      >
        <Form.Item label="Username">
          <Input
            name="username"
            disabled
            value={loggedInUser?.username}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            disabled
            value={loggedInUser?.email}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="First Name" name="firstname" 
        // rules={[{required: true}]}
        >
          <Input value={loggedInUser?.name} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Last Name" name="lastname" 
        // rules={[{required: true}]}
        >
          <Input value={loggedInUser?.name} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Row justify="end">
            <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button">Reset</Button>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfileTab;
