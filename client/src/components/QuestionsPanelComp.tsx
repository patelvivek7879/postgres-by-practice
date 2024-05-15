import React, { useEffect } from "react";
import { Button, Checkbox, notification, Row, Space, Typography } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";

const QuestionsPanelComp = ({
  text,
  traceable,
  id,
  isMarkedCompleted
}: {
  text: string;
  traceable?: boolean;
  id: string;
  isMarkedCompleted?: any;
}) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isMarked, setIsMarked] = useState(false);

  useEffect(()=>{
    setIsMarked((prev: boolean)=>{
        return isMarkedCompleted?.[id] ? true : false
      });
  },[isMarkedCompleted])

  const updateCurrentModuleStatus = async (e: any ) => {

    const isChecked = e.target.checked;
    setIsMarked(isChecked);
    const status = isChecked ? 1 : 0;
    const moduleNameKey = id;

    const data = {
      status: status,
      moduleName: moduleNameKey,
    };

    try {
      // updating a single module status
      const updatedUserProgressModule = await fetch("/api/v1/progress", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await updatedUserProgressModule.json();

      if (res.status === 200) {
        notification.success({
          message: isChecked ? "Marked successfully" : "Unmarked successfully",
          placement: "bottomRight",
          duration: 3,
        });
      }
    } catch (err) {
      setIsMarked(false);
      console.log("Error while marking updatation", err)
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {traceable ? (
        <Row justify={"end"} align={"middle"}>
          <Space size={3} align="center">
            <Checkbox checked={isMarked} onChange={(e) => updateCurrentModuleStatus(e)} />
            <small>{'mark as completed'}</small>
          </Space>
        </Row>
      ) : null}
      <div className="relative">
        <Row
          justify={"space-between"}
          align={"middle"}
          className="bg-slate-900"
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            color: "#bfbfbf",
            borderBottom: "1px solid #595959",
          }}
        >
          <code style={{ fontSize: 12 }} className="ml-2">
            {"SQL"}
          </code>
          <CopyToClipboard text={text}>
            <Button
              className="mr-1"
              size={"small"}
              type={"text"}
              onClick={() => {
                setIsCopying(true);
                setTimeout(() => {
                  setIsCopying(false);
                }, 1000);
              }}
              icon={
                !isCopying ? (
                  <CopyOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />
                ) : (
                  <CheckOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />
                )
              }
            >
              <Typography.Text style={{ fontSize: 12, color: "#bfbfbf" }}>
                {!isCopying ? "Copy code" : "copied "}
              </Typography.Text>
            </Button>
          </CopyToClipboard>
        </Row>
        <SyntaxHighlighter
          language="sql"
          customStyle={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            marginTop: 0,
          }}
          wrapLines={true}
          wrapLongLines={true}
          style={darcula}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    </Space>
  );
};

export default QuestionsPanelComp;
