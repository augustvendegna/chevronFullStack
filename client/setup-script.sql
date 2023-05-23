-- Create tables
CREATE TABLE users(

    user_id SERIAL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
    password_date TIMESTAMP,
    is_enabled BOOLEAN,
    status_date TIMESTAMP,
    is_admin BOOLEAN,

    PRIMARY KEY(user_id)
);

CREATE TABLE challenges(
    
    challenge_id SERIAL,
    author TEXT,
    public_start_date TIMESTAMP,
    public_end_date TIMESTAMP,
    private_start_date TIMESTAMP,
    private_end_date TIMESTAMP,

    PRIMARY KEY(challenge_id)

);

CREATE TABLE submissions(
    filename TEXT,
    submission_id SERIAL,
    submission_time TIMESTAMP,
    challenge_id INT,
    is_public BOOLEAN,

    PRIMARY KEY(submission_id)
);

INSERT INTO users (
    user_id,
    first_name,
    last_name,
    email,
    password,
    password_date,
    is_enabled,
    status_date,
    is_admin
)VALUES(
    DEFAULT,
    'Mr.',
    'Smith',
    'smith@bonks.com',
    'smitty',
    '2000-12-13',
    FALSE,
    '2000-12-13',
    FALSE
);