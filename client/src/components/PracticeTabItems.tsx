import React from "react";
import { CSSProperties } from "react";
import { CollapseProps } from "antd";
import MarkAsCompleted from "./MarkAsCompleted";
import QueryingData from "./PracticeModules/QueryingData";
import FilteringData from "./PracticeModules/FilteringData";
import Joins from "./PracticeModules/Joins";
import GroupingData from "./PracticeModules/GroupingData";
import Subquery from "./PracticeModules/Subquery";
import ModifiyingData from "./PracticeModules/ModifiyingData";
import Transactions from "./PracticeModules/Transactions";
import ManagingTablesColumns from "./PracticeModules/ManagingTablesColumns";
import PostgreSQLContraints from "./PracticeModules/PostgreSQLContraints";
import DataTypes from "./PracticeModules/DataTypes";

const getMarkAsCompleted = (id: string, moduleProgress: any) => (
  <MarkAsCompleted id={id} isMarkedCompleted={moduleProgress[id]} />
);

export const getItems: (
  panelStyle: CSSProperties,
  moduleProgress: { [key: string]: string | number }
) => CollapseProps["items"] = (panelStyle, moduleProgress) => {
  return [
    {
      key: "qryngdt",
      label: "Querying Data",
      children: <QueryingData />,
      style: panelStyle,
      extra: getMarkAsCompleted("qryngdt", moduleProgress),
    },
    {
      key: "fltrngdt",
      label: "Filtering Data",
      children: <FilteringData />,
      style: panelStyle,
      extra: getMarkAsCompleted("fltrngdt", moduleProgress),
    },
    {
      key: "jns",
      label: "Joins",
      children: <Joins />,
      style: panelStyle,
      extra: getMarkAsCompleted("jns", moduleProgress),
    },
    {
      key: "grpngdt",
      label: "Grouping Data",
      children: <GroupingData />,
      style: panelStyle,
      extra: getMarkAsCompleted("grpngdt", moduleProgress),
    },
    {
      key: "sbqry",
      label: "Subquery",
      children: <Subquery />,
      style: panelStyle,
      extra: getMarkAsCompleted("sbqry", moduleProgress),
    },
    {
      key: "mdfyngdt",
      id: "mdfyngdt",
      label: "Modifiying Data",
      children: <ModifiyingData />,
      style: panelStyle,
      extra: getMarkAsCompleted("mdfyngdt", moduleProgress),
    },
    {
      key: "transactions",
      label: "Transactions",
      children: <Transactions />,
      style: panelStyle,
      extra: getMarkAsCompleted("transactions", moduleProgress),
    },
    {
      key: "mngngtblcol",
      label: "Managing Tables & Columns",
      children: <ManagingTablesColumns />,
      style: panelStyle,
      extra: getMarkAsCompleted("mngngtblcol", moduleProgress),
    },
    {
      key: "psqlcntrnts",
      label: "PostgreSQL Contraints",
      children: <PostgreSQLContraints />,
      style: panelStyle,
      extra: getMarkAsCompleted("psqlcntrnts", moduleProgress),
    },
    {
      key: "dttyps",
      label: "Data Types",
      children: <DataTypes />,
      style: panelStyle,
      extra: getMarkAsCompleted("dttyps", moduleProgress),
    },
  ];
};
