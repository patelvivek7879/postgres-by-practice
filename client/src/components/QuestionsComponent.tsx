import React, { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Tabs, Typography, theme } from "antd";
import { getTheoryItems } from "./TheoryDataComponentFn";
import { getItems } from "./PracticeTabItems";
import { useProgressContext } from "@/providers/ProgressProvider";


const QuestionsComponent = () => {
  const { token } = theme.useToken();
  
  const { moduleProgress }: any = useProgressContext();

  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };


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
