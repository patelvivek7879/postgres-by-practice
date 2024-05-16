
-- Table 
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INT
);

-- Data insertion
INSERT INTO customers (name, email, age) VALUES
    ('John Doe', 'john.doe@example.com', 30),
    ('Jane Smith', 'jane.smith@example.com', 25),
    ('Alice Johnson', 'alice.johnson@example.com', 35);



