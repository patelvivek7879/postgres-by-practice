import { Space, Alert, Typography } from "antd";
import React from "react";
import QuestionsPanelComp from "../QuestionsPanelComp";

const { Text, Paragraph } = Typography;

const FilteringData = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Text strong>• WHERE clause:</Text>
      <Text>
        {" "}
        The SELECT statement returns all rows from one or more columns in a
        table. To retrieve rows that satisfy a specified condition, we use a
        WHERE clause.{" "}
      </Text>
      <Text strong>• Syntax</Text>
      <QuestionsPanelComp text="SELECT select_list FROM table_name WHERE condition ORDER BY sort_expression;" />

      <Text strong>• Example</Text>
      <Alert showIcon type="info" message="customer is predefined table" />

      <Text strong>
        1. Using WHERE clause with the equal (=) operator example
      </Text>
      <Paragraph>
        This example uses the SELECT statement to find the first names of all
        customers from the customer table:
      </Paragraph>
      <QuestionsPanelComp text="SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie';" />
      <Text strong>
        2. Using the WHERE clause with the AND operator example
      </Text>
      <Paragraph>
      The following example uses a WHERE clause with the AND logical operator to find customers whose first name and last names are Jamie and rice:
      </Paragraph>
      <QuestionsPanelComp text="SELECT   last_name,   first_name  FROM   customer WHERE   first_name = 'Jamie'   AND last_name = 'Rice';" />
      <Text strong>
        3. Using the WHERE clause with the OR operator example
      </Text>
      <Paragraph>
      The following example uses a WHERE clause with an OR operator to find the customers whose last name is Rodriguez or first name is Adam:
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name, last_name FROM customer WHERE last_name = 'Rodriguez' OR first_name = 'Adam';" />
      <Text strong>
        4. Using the WHERE clause with the IN operator example
      </Text>
      <Paragraph>
      If you want to find a value in a list of values, you can use the IN operator.
      The following example uses the WHERE clause with the IN operator to find the customers with first names in the list Ann, Anne, and Annie:
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name, last_name FROM customer WHERE first_name IN ('Ann', 'Anne', 'Annie');" />
      <Text strong>
        5. Using the WHERE clause with the LIKE operator example
      </Text>
      <Paragraph>
      To find a string that matches a specified pattern, you use the LIKE operator.
      The following example uses the LIKE operator in the WHERE clause to find customers whose first names start with the word Ann:
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name, last_name FROM customer WHERE first_name LIKE 'Ann%';" />

      <Text strong>
        6. Using the WHERE clause with the BETWEEN operator example
      </Text>
      <Paragraph>
      The following example finds customers whose first names start with the letter A and contains 3 to 5 characters by using the BETWEEN operator.
      The BETWEEN operator returns true if a value is in a range of values.
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name, LENGTH(first_name) name_length FROM customer WHERE first_name LIKE 'A%' AND LENGTH(first_name) BETWEEN 3 AND 5 ORDER BY name_length;" />

      <Text strong>
        {'7. Using the WHERE clause with the not equal operator (<>) example'}
      </Text>
      <Paragraph>
       This example finds customers whose first names start with Bra and last names are not Motley:
      </Paragraph>
      <QuestionsPanelComp text="SELECT first_name, last_name FROM customer WHERE first_name LIKE 'Bra%' AND last_name <> 'Motley';" />
    </Space>
  );
};

export default FilteringData;
