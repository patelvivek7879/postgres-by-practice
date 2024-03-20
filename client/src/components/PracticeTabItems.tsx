import { CSSProperties } from "react";
import QuestionsPanelComp from "./QuestionsPanelComp";
import { CollapseProps } from "antd";

const text = ` A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


export const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: "Querying Data",
      children: (
        <QuestionsPanelComp text="SELECT * FROM your_table WHERE condition = true;" />
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Filtering Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },
    {
      key: "3",
      label: "Joins",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },
    {
      key: "4",
      label: "Grouping Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },
    {
      key: "5",
      label: "Subquery",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },{
      key: "6",
      label: "Modifiying Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },{
      key: "7",
      label: "Transactions",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },{
      key: "8",
      label: "Managing Tables & Columns",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },{
      key: "9",
      label: "PostgreSQL Contraints",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },{
      key: "10",
      label: "Data Types",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
    },
  ];