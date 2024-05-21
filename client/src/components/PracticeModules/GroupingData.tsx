import { Space, Alert, Typography } from "antd";
import React from "react";
import QuestionsPanelComp from "../QuestionsPanelComp";

const { Text, Paragraph } = Typography;

const GroupingData = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Text strong>• PostgreSQL GROUP BY clause:</Text>
      <Text>
        {" "}
        The GROUP BY clause divides the rows returned from the SELECT statement
        into groups. For each group, you can apply an aggregate function such as
        SUM() to calculate the sum of items or COUNT() to get the number of
        items in the groups.
      </Text>
      <Text strong>• Syntax</Text>
      <QuestionsPanelComp text="SELECT column_1, column_2, ..., aggregate_function(column_3) FROM table_name GROUP BY column_1, column_2, ...;" />
      <Space direction="vertical" size={1}>
        <Text strong>In this syntax:</Text>
        <Paragraph>
          • First, select the columns that you want to group such as column1 and
          column2, and column that you want to apply an aggregate function
          (column3).
        </Paragraph>
        <Paragraph>
          • Second, list the columns that you want to group in the GROUP BY
          clause.
        </Paragraph>
        <Paragraph>
          The GROUP BY clause divides the rows by the values in the columns
          specified in the GROUP BY clause and calculates a value for each
          group.
        </Paragraph>
        <Paragraph>
          It's possible to use other clauses of the SELECT statement with the
          GROUP BY clause.
        </Paragraph>
        <Paragraph>
          PostgreSQL evaluates the GROUP BY clause after the FROM and WHERE
          clauses and before the HAVING SELECT, DISTINCT, ORDER BY and LIMIT
          clauses.
        </Paragraph>
      </Space>
      <Text strong>• Example</Text>
      <Alert showIcon type="info" message="payment is predefined table" />

      <Text strong>
        1. Using PostgreSQL GROUP BY without an aggregate function example
      </Text>
      <Paragraph>
        The following example uses the GROUP BY clause to retrieve the
        customer_id from the payment table:
      </Paragraph>
      <QuestionsPanelComp text="SELECT customer_id FROM payment GROUP BY customer_id ORDER BY customer_id;" />
      <Paragraph>
        Each customer has one or more payments. The GROUP BY clause removes
        duplicate values in the customer_id column and returns distinct customer
        ids. In this example, the GROUP BY clause works like the DISTINCT
        operator.
      </Paragraph>

      <Text strong>
        2. Using PostgreSQL GROUP BY with SUM() function example
      </Text>
      <Paragraph>
        The GROUP BY clause is useful when used in conjunction with an aggregate
        function.
      </Paragraph>
      <Paragraph>
        The following query uses the GROUP BY clause to retrieve the total
        payment paid by each customer:
      </Paragraph>
      <QuestionsPanelComp text="SELECT customer_id, SUM (amount) FROM payment GROUP BY customer_id ORDER BY customer_id;" />
      <Paragraph>
        In this example, the GROUP BY clause groups the payments by the customer
        id. For each group, it calculates the total payment.
      </Paragraph>
      <Paragraph>
        The following statement uses the ORDER BY clause with GROUP BY clause to
        sort the groups by total payments:
      </Paragraph>
      <QuestionsPanelComp text="SELECT customer_id, SUM (amount) FROM payment GROUP BY customer_id ORDER BY SUM (amount) DESC;" />

      <Text strong>
        3. Using PostgreSQL GROUP BY clause with the JOIN clause
      </Text>
      <Paragraph>
        The following statement uses the GROUP BY clause to retrieve the total
        payment for each customer and display the customer name and amount:
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name || ' ' || last_name full_name, SUM (amount) amount FROM payment INNER JOIN customer USING (customer_id) GROUP BY full_name ORDER BY amount DESC;" />
      <Paragraph>
        In this example, we join the payment table with the customer table using
        an inner join to get the customer names and group customers by their
        names.
      </Paragraph>

      <Text strong>
        4. Using PostgreSQL GROUP BY with COUNT() function example
      </Text>
      <Paragraph>
        The following example uses the GROUP BY clause with the COUNT() function
        to count the number of payments processed by each staff:
      </Paragraph>
      <QuestionsPanelComp text="SELECT staff_id, COUNT (payment_id) FROM payment GROUP BY staff_id;" />

      <Text strong>5. Using PostgreSQL GROUP BY with multiple columns</Text>
      <Paragraph>
        The following example uses a GROUP BY clause to group rows by values in
        two columns:
      </Paragraph>
      <QuestionsPanelComp text="SELECT customer_id, staff_id, SUM(amount) FROM payment GROUP BY staff_id, customer_id ORDER BY customer_id;" />

      <Text strong>6. Using PostgreSQL GROUP BY clause with a date column</Text>
      <Paragraph>
        The following example uses the GROUP BY clause to group the payments by
        payment date:
      </Paragraph>
      <QuestionsPanelComp text="SELECT payment_date::date payment_date, SUM(amount) sum FROM payment GROUP BY payment_date::date ORDER BY payment_date DESC;" />
    </Space>
  );
};

export default GroupingData;
