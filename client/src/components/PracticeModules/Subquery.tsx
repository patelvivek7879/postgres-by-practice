import { Space, Alert, Typography } from "antd";
import React from "react";
import QuestionsPanelComp from "../QuestionsPanelComp";

const { Text, Paragraph } = Typography;

const Subquery = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Text strong>• PostgreSQL subquery:</Text>
      <Paragraph>
        A subquery is a query nested within another query. A subquery is also
        known as an inner query or nested query.
      </Paragraph>
      <Paragraph>
        A subquery can be useful for retrieving data that will be used by the
        main query as a condition for further data selection.
      </Paragraph>
      <Text strong>• The basic syntax of the subquery is as follows:</Text>
      <QuestionsPanelComp text="SELECT select_list FROM table1 WHERE columnA operator (SELECT columnB from table2 WHERE condition);" />

      <Paragraph>
        In this syntax, the subquery is enclosed within parentheses and is
        executed first:
      </Paragraph>
      <QuestionsPanelComp text="SELECT columnB from table2 WHERE condition" />

      <Text strong>• Example</Text>
      <Alert
        showIcon
        type="info"
        message="city and country is predefined table"
      />

      <Text strong>1. Basic PostgreSQL subquery example</Text>
      <Paragraph>
        First, retrieve the country id of the United States from the country
        table:
      </Paragraph>
      <QuestionsPanelComp text="SELECT country_id from country where country = 'United States';" />

      <Paragraph>
        Second, retrieve cities from the city table where country_id is 103:
      </Paragraph>

      <Text strong>
        Instead of executing two queries, you can combine them into one, making
        the first query as a subquery and the second query as the main query as
        follows:
      </Text>

      <QuestionsPanelComp text="SELECT city FROM city WHERE country_id = (SELECT country_id FROM country WHERE country = 'United States') ORDER BY city;" />

      <Paragraph>In this query, the following is the subquery:</Paragraph>
      <QuestionsPanelComp text="SELECT country_id FROM country WHERE country = 'United States';" />

      <Text strong>2. Using a subquery with the IN operator</Text>
      <Paragraph>
        A subquery can return zero or more rows. If the query returns more than
        one row, you can use it with the IN operator. For example:
      </Paragraph>
      <Paragraph>
        First, retrieve film_id of the film with the category Action:
      </Paragraph>
      <QuestionsPanelComp text="SELECT film_id FROM film_category INNER JOIN category USING(category_id) WHERE name = 'Action';" />
      <Paragraph>
        Second, use the query above as a subquery to retrieve the film title
        from the film table:
      </Paragraph>
      <QuestionsPanelComp text="SELECT film_id, title FROM film WHERE film_id IN (SELECT film_id FROM film_category INNER JOIN category USING(category_id) WHERE name = 'Action') ORDER BY film_id;" />
    </Space>
  );
};

export default Subquery;
