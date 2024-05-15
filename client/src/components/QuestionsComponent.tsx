import React, { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Tabs, Typography, theme } from "antd";
import { getTheoryItems } from "./TheoryDataComponentFn";
import { getItems } from "./PracticeTabItems";

type Props = {
  moduleProgress: Array<{[key: string]: string | number}>
  setModuleProgress: (value: Array<{[key: string]: string | number}>) => void;
}

const QuestionsComponent = ({moduleProgress, setModuleProgress}: Props) => {
  const { token } = theme.useToken();
  

  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getCurrentModuleStatus = async () => {
    try {
      // updating a single module status
      const updatedUserProgressModule = await fetch("/api/v1/progress", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await updatedUserProgressModule.json();

      if (res.status === 200) {
        setModuleProgress(res?.userProgress)
      }
    } catch (err) {
      console.log("Error while getting module progress", err);
    }
  };

  useEffect(()=>{
    getCurrentModuleStatus();
  },[]);

  return (
    <>
      <Typography.Title level={4} className="pl-4">
        {'Course Content'}
      </Typography.Title>
      <Tabs
        type="card"
        className="p-4"
        items={[
          {
            key: "practice",
            label: "Practice",
            children: (
              <div className="h-[65vh] overflow-auto">
                <Collapse
                  size="small"
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  // style={{ background: token.colorBgContainer }}
                  items={getItems(panelStyle, moduleProgress)}
                />
              </div>
            ),
          },
          {
            key: "theory",
            label: "Theory",
            children: (
              <div className="h-[65vh] overflow-auto">
                <Collapse
                  bordered={false}
                  size="small"
                  // defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  // style={{ background: token.colorBgContainer }}
                  items={getTheoryItems(panelStyle)}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default QuestionsComponent;
