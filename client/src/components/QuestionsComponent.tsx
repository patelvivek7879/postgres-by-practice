import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, Typography, theme } from "antd";
import QuestionsPanelComp from "./QuestionsPanelComp";

const text = ` A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: (
      <QuestionsPanelComp text="SELECT * FROM your_table WHERE condition = true;" />
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <QuestionsPanelComp text={text} />,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <QuestionsPanelComp text={text} />,
    style: panelStyle,
  },
];

const QuestionsComponent = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <>
      <Typography.Title level={4} className="pl-4">
        Course Content
      </Typography.Title>
      <div className="h-[75vh] p-4 overflow-auto">
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </div>
    </>
  );
};

export default QuestionsComponent;
