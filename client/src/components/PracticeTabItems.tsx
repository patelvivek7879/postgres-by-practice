import React from "react";
import { CSSProperties } from "react";
import QuestionsPanelComp from "./QuestionsPanelComp";
import { CollapseProps } from "antd";

const text = ` A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const getItems: (
  panelStyle: CSSProperties,
  moduleProgress: { [key: string]: string | number }
) => CollapseProps["items"] = (panelStyle, moduleProgress) => {
  return [
    {
      key: "qryngdt",
      label: "Querying Data",
      children: (
        <QuestionsPanelComp
          text="SELECT * FROM your_table WHERE condition = true;"
          traceable
          id={"qryngdt"}
          isMarkedCompleted={moduleProgress}
        />
      ),
      style: panelStyle,
    },
    {
      key: "fltrngdt",
      label: "Filtering Data",
      children: <QuestionsPanelComp text={text} traceable id="fltrngdt" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "jns",
      label: "Joins",
      children: <QuestionsPanelComp text={text} traceable id="jns" isMarkedCompleted={moduleProgress}/>,
      style: panelStyle,
    },
    {
      key: "grpngdt",
      label: "Grouping Data",
      children: <QuestionsPanelComp text={text} traceable id={"grpngdt"} isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "sbqry",
      label: "Subquery",
      children: <QuestionsPanelComp text={text} traceable id="sbqry" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "mdfyngdt",
      id: "mdfyngdt",
      label: "Modifiying Data",
      children: <QuestionsPanelComp text={text} traceable id="mdfyngdt" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "transactions",
      label: "Transactions",
      children: <QuestionsPanelComp text={text} traceable id="transactions" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "mngngtblcol",
      label: "Managing Tables & Columns",
      children: <QuestionsPanelComp text={text} traceable id="mngngtblcol"  isMarkedCompleted={moduleProgress}/>,
      style: panelStyle,
    },
    {
      key: "psqlcntrnts",
      label: "PostgreSQL Contraints",
      children: <QuestionsPanelComp text={text} traceable id="psqlcntrnts" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
    {
      key: "dttyps",
      label: "Data Types",
      children: <QuestionsPanelComp text={text} traceable id="dttyps" isMarkedCompleted={moduleProgress} />,
      style: panelStyle,
    },
  ];
};
