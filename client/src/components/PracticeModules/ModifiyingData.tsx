import { Space, Alert, Typography } from "antd";
import React from "react";
import QuestionsPanelComp from "../QuestionsPanelComp";

const { Text, Paragraph } = Typography;

const ModifiyingData = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Text strong>• PostgreSQL INSERT statement:</Text>
      <Text>
        The PostgreSQL INSERT statement allows you to insert a new row into a
        table.
      </Text>
      <Text strong>• Syntax</Text>
      <QuestionsPanelComp text="INSERT INTO table1(column1, column2, …) VALUES (value1, value2, …);" />

      <Space direction="vertical" size={1}>
        <Paragraph>In this syntax:</Paragraph>
        <Text>
          • First, specify the name of the table (table1) that you want to
          insert data after the INSERT INTO keywords and a list of
          comma-separated columns (colum1, column2, ....).{" "}
        </Text>
        <Text>
          • Second, supply a list of comma-separated values in parentheses
          (value1, value2, ...) after the VALUES keyword. The column and value
          lists must be in the same order.
        </Text>

        <Paragraph>
          The INSERT statement returns a command tag with the following form:
        </Paragraph>

        <QuestionsPanelComp text="INSERT oid count" />

        <Paragraph>In this syntax:</Paragraph>
        <Text>
          • The OID is an object identifier. PostgreSQL used the OID internally
          as a primary key for its system tables. Typically, the INSERT
          statement returns OID with a value of 0.{" "}
        </Text>
        <Text>
          • The count is the number of rows that the INSERT statement inserted
          successfully.
        </Text>

        <Paragraph>
          If you insert a new row into a table successfully, the return will
          typically look like:
        </Paragraph>

        <QuestionsPanelComp text="INSERT 0 1" />

        <Text strong>• RETURNING clause</Text>
        <Paragraph>
          The INSERT statement has an optional RETURNING clause that returns the
          information of the inserted row.
        </Paragraph>
        <Paragraph>
          If you want to return the entire inserted row, you use an asterisk (*)
          after the RETURNING keyword:
        </Paragraph>

        <QuestionsPanelComp text="INSERT INTO table1(column1, column2, …) VALUES (value1, value2, …) RETURNING *;" />

        <Paragraph>
          If you want to return some information about the inserted row, you can
          specify one or more columns after the RETURNING clause.
        </Paragraph>
        <Paragraph>
          For example, the following statement returns the id of the inserted
          row:
        </Paragraph>

        <QuestionsPanelComp text="INSERT INTO table1(column1, column2, …) VALUES (value1, value2, …) RETURNING id;" />

        <Paragraph>
          To rename the returned value, you use the AS keyword followed by the
          name of the output. For example:
        </Paragraph>

        <QuestionsPanelComp text="INSERT INTO table1(column1, column2, …) VALUES (value1, value2, …) RETURNING output_expression AS output_name;" />
      </Space>

      <Text strong>• Example</Text>

      <Paragraph>
        The following statement creates a new table called links for the
        demonstration:
      </Paragraph>

      <QuestionsPanelComp
        text="CREATE TABLE links (
  id SERIAL PRIMARY KEY, 
  url VARCHAR(255) NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  description VARCHAR (255), 
  last_update DATE
);"
      />

      <Text strong>1. Basic PostgreSQL INSERT statement example example</Text>
      <Paragraph>
        The following example uses the INSERT statement to insert a new row into
        the links table:
      </Paragraph>
      <QuestionsPanelComp text="INSERT INTO links (url, name) VALUES('https://www.postgresqltutorial.com','PostgreSQL Tutorial');" />

      <Text strong>
        2. Inserting character string that contains a single quote
      </Text>
      <Paragraph>
        If you want to insert a string that contains a single quote (') such as
        O'Reilly Media, you have to use an additional single quote (') to escape
        it. For example:
      </Paragraph>
      <QuestionsPanelComp text="INSERT INTO links (url, name) VALUES('http://www.oreilly.com','O''Reilly Media');" />

      <Text strong>3. Inserting a date value</Text>
      <Paragraph>
        To insert a date into a DATE column, you use the date in the format
        'YYYY-MM-DD'.
      </Paragraph>
      <Paragraph>
        For example, the following statement inserts a new row with a specified
        date into the links table:
      </Paragraph>
      <QuestionsPanelComp
        text="INSERT INTO links (url, name, last_update)
VALUES('https://www.google.com','Google','2013-06-01');"
      />

      <Text strong>4. Getting the last inserted ID</Text>
      <Paragraph>
        To get the last inserted ID from the inserted row, you use the RETURNING
        clause of the INSERTstatement.
      </Paragraph>
      <Paragraph>
        For example, the following statement inserts a new row into the links
        table and returns the last inserted id:
      </Paragraph>
      <QuestionsPanelComp text="INSERT INTO links (url, name) VALUES('https://www.postgresql.org','PostgreSQL') RETURNING id;" />
    </Space>
  );
};

export default ModifiyingData;
