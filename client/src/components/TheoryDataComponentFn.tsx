import React from "react";
import { Alert, Typography } from "antd";
import { CSSProperties } from "react";
import { Fragment } from "react/jsx-runtime";
import QuestionsPanelComp from "./QuestionsPanelComp";

const { Text, Paragraph } = Typography;

export const getTheoryItems = (panelStyle: CSSProperties = {}) => [
    {
      key: "1",
      label: <Text>Introduction to Database</Text>,
      children: (
        <Fragment>
          <Text strong> • What is a database?</Text>
          <Paragraph>
            A database is an organized collection of structured information or
            data, typically stored electronically in a computer system. It is
            designed to efficiently manage, retrieve, and manipulate data
            according to specific requirements. Databases are fundamental
            components of modern computing systems and are used in various
            applications, ranging from simple task lists to complex enterprise
            systems.
          </Paragraph>
          <Text strong> • Types of databases (relational, NoSQL, etc.)</Text>
          <Paragraph>
            Databases can be classified into various types based on their data
            model, structure, and the way they store and organize data. Some of
            the common types of databases include:
          </Paragraph>
          <Text strong>Relational Databases:</Text>
          <Paragraph>
            Relational databases organize data into tables with rows and columns.
            They use structured query language (SQL) for querying and managing
            data. Examples include MySQL, PostgreSQL, Oracle Database, Microsoft
            SQL Server, and SQLite. Relational databases are widely used in
            various applications and are known for their strong consistency and
            ACID (Atomicity, Consistency, Isolation, Durability) properties.
          </Paragraph>
          <Text strong>NoSQL Databases:</Text>
          <Paragraph>
            NoSQL (Not Only SQL) databases are designed to handle large volumes of
            unstructured or semi-structured data. They offer flexibility and
            scalability and are suitable for use cases where traditional
            relational databases may not perform well, such as big data, real-time
            web applications, and distributed systems. NoSQL databases can be
            further categorized into different types based on their data model:
          </Paragraph>
          <Text strong>Document Stores:</Text>
          <Paragraph>
            Store data in flexible, semi-structured documents (e.g., JSON, XML).
            Examples include MongoDB, Couchbase, and CouchDB.
          </Paragraph>
          <Text strong>Key-Value Stores:</Text>
          <Paragraph>
            Store data as key-value pairs, offering high performance and
            scalability. Examples include Redis, Amazon DynamoDB, and Riak.
          </Paragraph>
          <Text strong>Column Family Stores:</Text>
          <Paragraph>
            Store data in columns rather than rows, suitable for large-scale data
            storage and analytics. Examples include Apache Cassandra and HBase.
          </Paragraph>
          <Text strong>Graph Databases:</Text>
          <Paragraph>
            Store data in nodes and edges, allowing for efficient representation
            and querying of complex relationships. Examples include Neo4j, Amazon
            Neptune, and ArangoDB.
          </Paragraph>
          <Text strong>Other type of Databases:</Text>
          <Paragraph>
            • NewSQL Databases • In-Memory Databases • Time-Series Databases •
            Spatial Databases
          </Paragraph>
        </Fragment>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: <Text>Basic SQL Concepts </Text>,
      children: (
        <Fragment>
          <Text strong> • What is a SQL?</Text>
          <Paragraph>
            SQL (Structured Query Language) is a standardized programming language
            used for managing and manipulating relational databases. Originally
            developed by IBM in the 1970s, SQL has since become the de facto
            standard language for interacting with relational database management
            systems (RDBMS).
          </Paragraph>
          <Text strong>
            {" "}
            • SQL provides a set of commands and syntax for performing various
            operations on databases, including:
          </Text>
          <></>
          <Text strong>Data Querying:</Text>
          <Paragraph>
            SQL allows users to retrieve specific data from a database using the
            SELECT statement. Users can specify criteria for filtering data,
            sorting results, and combining data from multiple tables using joins.
          </Paragraph>
          <Text strong>Data Manipulation:</Text>
          <Paragraph>
            SQL provides commands for adding, modifying, and deleting data in a
            database. These commands include INSERT (for adding new records),
            UPDATE (for modifying existing records), and DELETE (for removing
            records).
          </Paragraph>
          <Text strong>Data Definition:</Text>
          <Paragraph>
            SQL enables users to define the structure of a database, including
            tables, columns, indexes, constraints, and relationships between
            tables. Commands such as CREATE TABLE, ALTER TABLE, and DROP TABLE are
            used for defining and modifying database schema.
          </Paragraph>
          <Text strong>Data Control:</Text>
          <Paragraph>
            SQL includes commands for managing access permissions and security
            settings in a database. These commands allow administrators to grant
            or revoke privileges to users and roles, ensuring data security and
            integrity.
          </Paragraph>
          <Paragraph>
            SQL syntax is based on a set of standard clauses, keywords, and
            expressions, although specific implementations may introduce
            variations or extensions. Major relational database management systems
            such as MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, and
            SQLite all support SQL as their primary query language.
          </Paragraph>
        </Fragment>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: <Text>SQL syntax overview</Text>,
      children: (
        <Fragment>
          <Paragraph>
            SQL syntax encompasses a variety of statements and clauses used to
            interact with relational databases. Here's a brief overview of some
            common SQL syntax elements:
          </Paragraph>
          <Text strong>• SELECT Statement:</Text>
          <Paragraph>Used to retrieve data from one or more tables.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={"SELECT column1, column2, ... FROM table_name WHERE condition;"}
          />
          <Text strong>• INSERT Statement:</Text>
          <Paragraph>Used to insert new records into a table.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={
              "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);"
            }
          />
          <Text strong>• UPDATE Statement:</Text>
          <Paragraph>Used to modify existing records in a table.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={
              "UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;"
            }
          />
          <Text strong>• Delete Statement:</Text>
          <Paragraph>Used to delete records from a table.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp text={"DELETE FROM table_name WHERE condition;"} />
          <Text strong>• CREATE TABLE Statement:</Text>
          <Paragraph>Used to create a new table in the database.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={
              "CREATE TABLE table_name (column1 datatype, column2 datatype, ...);"
            }
          />
          <Text strong>• ALTER TABLE Statement:</Text>
          <Paragraph>
            Used to modify the structure of an existing table.
          </Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={"ALTER TABLE table_name ADD column_name datatype;"}
          />
          <Text strong>• DROP TABLE Statement:</Text>
          <Paragraph>Used to delete a table from the database.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp text={"DROP TABLE table_name;"} />
  
          <Text strong>• Constraints:</Text>
          <Paragraph>
            Constraints enforce rules or restrictions on the data stored in a
            table.
          </Paragraph>
          <Text strong>Common constraints include:</Text>
          <QuestionsPanelComp
            text={"PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, and CHECK."}
          />
  
          <Text strong>• Joins:</Text>
          <Paragraph>
            Used to retrieve data from multiple tables based on a related column
            between them.
          </Paragraph>
          <Text strong>Common types of joins include:</Text>
          <QuestionsPanelComp
            text={
              "INNER JOIN, LEFT JOIN (or LEFT OUTER JOIN), RIGHT JOIN (or RIGHT OUTER JOIN), and FULL JOIN (or FULL OUTER JOIN)."
            }
          />
  
          <Text strong>• Aggregate Functions:</Text>
          <Paragraph>
            Functions that perform a calculation on a set of values and return a
            single result.
          </Paragraph>
          <Text strong>Common aggregate functions include:</Text>
          <QuestionsPanelComp text={"COUNT, SUM, AVG, MIN, and MAX."} />
  
          <Text strong>• Group By Clause:</Text>
          <Paragraph>
            Used with aggregate functions to group rows that have the same values
            into summary rows.
          </Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={
              "SELECT column1, aggregate_function(column2) FROM table_name GROUP BY column1;"
            }
          />
  
          <Text strong>• Order By Clause:</Text>
          <Paragraph>
            Used to sort the result set in ascending or descending order based on
            one or more columns.
          </Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp
            text={
              "SELECT column1, column2, ... FROM table_name ORDER BY column1 ASC/DESC, column2 ASC/DESC, ...;"
            }
          />
        </Fragment>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: <Text>Basic SQL Queries: SELECT, INSERT, UPDATE, DELETE</Text>,
      children: (
        <Fragment>
          <Alert type="warning" showIcon message={<Text>customers is predefined table</Text>} />
          <Text strong>• SELECT Query:</Text>
          <Paragraph>Used to retrieve data from one or more tables.</Paragraph>
          <Text strong>Example:</Text>
          <QuestionsPanelComp
            text={"SELECT * FROM customers;"}
          />
          <Text strong>• INSERT Query:</Text>
          <Paragraph>Used to insert new records into a table.</Paragraph>
          <Text strong>Example:</Text>
          <QuestionsPanelComp
            text={
              "INSERT INTO customers (name, email, age) VALUES ('John Doe', 'john@example.com', 30);"
            }
          />
          <Text strong>• UPDATE Query:</Text>
          <Paragraph>Used to modify existing records in a table.</Paragraph>
          <Text strong>Example:</Text>
          <QuestionsPanelComp
            text={
              "UPDATE customers SET age = 31 WHERE id = 1;"
            }
          />
          <Text strong>• DELETE Query:</Text>
          <Paragraph>Used to delete records from a table.</Paragraph>
          <Text strong>Syntax:</Text>
          <QuestionsPanelComp text={"DELETE FROM customers WHERE id = 1;"} />
        </Fragment>
      ),
      style: panelStyle,
    },
  ];