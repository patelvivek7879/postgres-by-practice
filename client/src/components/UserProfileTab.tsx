import React from "react";
import { Form, Input } from "antd";
import { useAuthContext } from "@/AuthProvider";

const UserProfileTab = () => {
  const { loggedInUser }: any = useAuthContext();

  const updateUserInfo = async (values: any) => {
    const { email } = loggedInUser;
    const body = {
      email,
      ...values,
    };

    try {
      const updatedUserDetails = await fetch("/api/v1/users/update", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return await updatedUserDetails.json();
    } catch (error) {
      console.error("Error while updating user ", error);
    }
  };

  return (
    <div
      className="w-full flex justify-center pb-3"
      style={{
        maxHeight: 600,
        height: 480,
        overflowY: "scroll",
        scrollBehavior: "smooth",
        scrollbarColor: "#bfbfbf transparent",
        scrollbarWidth: "thin",
      }}
    >
      <Form
        className="w-full flex flex-col justify-center mt-4"
        // {...formItemLayout}
        layout="vertical"
        variant="filled"
        style={{ maxWidth: 600 }}
        size="middle"
        onFinish={(values) => updateUserInfo(values)}
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

        <Form.Item label="First Name">
          <Input
            value={loggedInUser?.name.split(" ")[0]}
            style={{ width: "100%" }}
            disabled
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            value={loggedInUser?.name.split(" ")[1]}
            style={{ width: "100%" }}
            disabled
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfileTab;
