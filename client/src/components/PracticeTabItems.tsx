import React from "react";
import { CSSProperties } from "react";
import QuestionsPanelComp from "./QuestionsPanelComp";
import { Alert, CollapseProps, Space, Typography } from "antd";
import MarkAsCompleted from "./MarkAsCompleted";

const text = ` A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Text, Paragraph } = Typography;

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
      children: (
        <Space direction="vertical" className="w-full">
          <Text strong>• Select Statement:</Text>
          <Text>
            {" "}
            Select statement that retrives data from a signle table.{" "}
          </Text>
          <Text strong>• Syntax</Text>
          <QuestionsPanelComp text="SELECT select_list FROM table_name;" />
          <Space direction="vertical" size={1}>
            <Paragraph>
              The SELETE statememt has the following clauses:
            </Paragraph>
            <Text>• Select distinct rows using DISTINCT operator. </Text>
            <Text>• Sort rows using ORDER BY clause.</Text>
            <Text>• Filter rows using WHERE clause.</Text>
            <Text>
              • Select a subset of rows from a table using LIMIT or FETCH
              clause.
            </Text>
            <Text>• Group rows into groups using GROUP BY clause.</Text>
            <Text>• Filter groups using HAVING clause.</Text>
            <Text>
              • Join with other tables using joins such as INNER JOIN, LEFT
              JOIN, FULL OUTER JOIN, CROSS JOIN clauses.
            </Text>
            <Text>
              • Perform set operations using UNION, INTERSECT, and EXCEPT.
            </Text>
          </Space>
          <Text strong>• Example</Text>
          <Alert showIcon type="info" message="customers is predefined table" />

          <Text strong>
            1. Using PostgreSQL SELECT statement to query data from one column
            example
          </Text>
          <Paragraph>
            This example uses the SELECT statement to find the first names of
            all customers from the customer table:
          </Paragraph>
          <QuestionsPanelComp text="SELECT first_name FROM customers;" />

          <Text strong>
            2. Using PostgreSQL SELECT statement to query data from multiple
            columns example
          </Text>
          <Paragraph>
            The following query uses the SELECT statement to retrieve first
            name, last name, and email of customers from the customer table:
          </Paragraph>
          <QuestionsPanelComp text="SELECT first_name, last_name, email FROM customer" />

          <Text strong>
            3. Using PostgreSQL SELECT statement to query data from all columns
            of a table example
          </Text>
          <Paragraph>
            The following query uses the SELECT * statement to retrieve data
            from all columns of the customer table:
          </Paragraph>
          <QuestionsPanelComp text="SELECT * FROM customer" />

          <Text strong>
            4. Using PostgreSQL SELECT statement with expressions example
          </Text>
          <Paragraph>
            The following example uses the SELECT statement to return the full
            names and emails of all customers from the customer table:
          </Paragraph>
          <QuestionsPanelComp text="SELECT first_name || ' ' || last_name, email FROM  customer;" />

          <Text strong>
            5. Using PostgreSQL SELECT statement without a FROM clause
          </Text>
          <Paragraph>
            The FROM clause of the SELECT statement is optional. Therefore, you
            can omit it in the SELECT statement. Typically, you use the SELECT
            clause with a function to retrieve the function result. For example:
          </Paragraph>
          <QuestionsPanelComp text="SELECT NOW();" />
        </Space>
      ),
      style: panelStyle,
      extra: getMarkAsCompleted("qryngdt", moduleProgress),
    },
    {
      key: "fltrngdt",
      label: "Filtering Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("fltrngdt", moduleProgress),
    },
    {
      key: "jns",
      label: "Joins",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("jns", moduleProgress),
    },
    {
      key: "grpngdt",
      label: "Grouping Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("grpngdt", moduleProgress),
    },
    {
      key: "sbqry",
      label: "Subquery",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("sbqry", moduleProgress),
    },
    {
      key: "mdfyngdt",
      id: "mdfyngdt",
      label: "Modifiying Data",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("mdfyngdt", moduleProgress),
    },
    {
      key: "transactions",
      label: "Transactions",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("transactions", moduleProgress),
    },
    {
      key: "mngngtblcol",
      label: "Managing Tables & Columns",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("mngngtblcol", moduleProgress),
    },
    {
      key: "psqlcntrnts",
      label: "PostgreSQL Contraints",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("psqlcntrnts", moduleProgress),
    },
    {
      key: "dttyps",
      label: "Data Types",
      children: <QuestionsPanelComp text={text} />,
      style: panelStyle,
      extra: getMarkAsCompleted("dttyps", moduleProgress),
    },
  ];
};
