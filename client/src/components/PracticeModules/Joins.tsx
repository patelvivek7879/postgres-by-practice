import { Space, Alert, Typography } from "antd";
import React from "react";
import QuestionsPanelComp from "../QuestionsPanelComp";
import AceEditorComponent from "../AceEditorComponents";

const { Text, Paragraph } = Typography;

const Joins = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Text strong>• Setting up sample tables:</Text>
      <Text>
        {" "}
        Suppose you have two tables called basket_a and basket_b that store
        fruits:{" "}
      </Text>
      <QuestionsPanelComp
        text={`CREATE TABLE basket_a (
    a INT PRIMARY KEY,
    fruit_a VARCHAR (100) NOT NULL
);

CREATE TABLE basket_b (
    b INT PRIMARY KEY,
    fruit_b VARCHAR (100) NOT NULL
);

INSERT INTO basket_a (a, fruit_a)
VALUES
    (1, 'Apple'),
    (2, 'Orange'),
    (3, 'Banana'),
    (4, 'Cucumber');

INSERT INTO basket_b (b, fruit_b)
VALUES
    (1, 'Orange'),
    (2, 'Apple'),
    (3, 'Watermelon'),
    (4, 'Pear');`}
      />
      <Text strong>• Example</Text>

      <Text strong>1. PostgreSQL inner join</Text>
      <Paragraph>
        The following statement joins the first table (basket_a) with the second
        table (basket_b) by matching the values in the fruit_a and fruit_b
        columns:
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a INNER JOIN basket_b ON fruit_a = fruit_b;" />
      <Paragraph>
        The inner join examines each row in the first table (basket_a). It
        compares the value in the fruit_a column with the value in the fruit_b
        column of each row in the second table (basket_b). If these values are
        equal, the inner join creates a new row that contains columns from both
        tables and adds this new row to the result set.
      </Paragraph>

      <Text strong>2. PostgreSQL left join</Text>
      <Paragraph>
        The following statement uses the left join clause to join the basket_a
        table with the basket_b table. In the left join context, the first table
        is called the left table and the second table is called the right table.
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a , b , fruit_b FROM basket_a LEFT JOIN basket_b ON fruit_a = fruit_b;" />
      <Paragraph>
        The left join starts selecting data from the left table. It compares
        values in the fruit_a column with the values in the fruit_b column in
        the basket_b table.
      </Paragraph>
      <Paragraph>
        If these values are equal, the left join creates a new row that contains
        columns of both tables and adds this new row to the result set. (see the
        row #1 and #2 in the result set).
      </Paragraph>
      <Paragraph>
        In case the values do not equal, the left join also creates a new row
        that contains columns from both tables and adds it to the result set.
        However, it fills the columns of the right table (basket_b) with null.
        (see the row #3 and #4 in the result set).
      </Paragraph>

      <Text strong>Left Outer join</Text>
      <Paragraph>
        To select rows from the left table that do not have matching rows in the
        right table, you use the left join with a WHERE clause. For example:
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a LEFT JOIN basket_b ON fruit_a = fruit_b WHERE b IS NULL;" />

      <Text strong>3. PostgreSQL right join</Text>
      <Paragraph>
        The right join is a reversed version of the left join. The right join
        starts selecting data from the right table. It compares each value in
        the fruit_b column of every row in the right table with each value in
        the fruit_a column of every row in the fruit_a table.
      </Paragraph>
      <Paragraph>
        If these values are equal, the right join creates a new row that
        contains columns from both tables.
      </Paragraph>
      <Paragraph>
        In case these values are not equal, the right join also creates a new
        row that contains columns from both tables. However, it fills the
        columns in the left table with NULL.
      </Paragraph>

      <Paragraph>
        The following statement uses the right join to join the basket_a table
        with the basket_b table:
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a RIGHT JOIN basket_b ON fruit_a = fruit_b;" />

      <Text strong>Right Outer join</Text>
      <Paragraph>
        Similarly, you can get rows from the right table that do not have
        matching rows from the left table by adding a WHERE clause as follows:
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a RIGHT JOIN basket_b ON fruit_a = fruit_b WHERE a IS NULL;" />

      <Text strong>4. PostgreSQL full outer join</Text>
      <Paragraph>
        The full outer join or full join returns a result set that contains all
        rows from both left and right tables, with the matching rows from both
        sides if available. In case there is no match, the columns of the table
        will be filled with NULL.
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a FULL OUTER JOIN basket_b ON fruit_a = fruit_b;" />

      <Text strong>Full Outer join</Text>
      <Paragraph>
        To return rows in a table that do not have matching rows in the other,
        you use the full join with a WHERE clause like this:
      </Paragraph>
      <QuestionsPanelComp text="SELECT a, fruit_a, b, fruit_b FROM basket_a FULL JOIN basket_b ON fruit_a = fruit_b WHERE a IS NULL OR b IS NULL;" />
    </Space>
  );
};

export default Joins;
