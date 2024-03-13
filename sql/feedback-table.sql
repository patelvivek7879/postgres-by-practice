DROP TABLE IF EXISTS feedbacks;

-- Enable uuid-ossp extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the users table
-- CREATE TABLE IF NOT EXISTS feedbacks (
--     f_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP WITHOUT TIME ZONE
--     message VARCHAR(255) NOT NULL
--     from VARCHAR(255) NOT NULL
-- );

CREATE TABLE feedbacks (
    f_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "from" VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    CONSTRAINT unique_createdAt UNIQUE ("createdAt")
);