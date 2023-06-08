-- Create tables
CREATE TABLE users(

    user_id SERIAL,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    password_date TIMESTAMP,
    is_enabled BOOLEAN,
    status_date TIMESTAMP,
    is_admin BOOLEAN,
    username TEXT,

    PRIMARY KEY(user_id)
);

CREATE TABLE challenges(
    
    challenge_id SERIAL,
    author TEXT,
    description TEXT,
    public_start_date TIMESTAMP,
    public_end_date TIMESTAMP,
    private_start_date TIMESTAMP,
    private_end_date TIMESTAMP,
    testFlag TEXT,
    challenge_name TEXT,
    max_submissions INT,
    PRIMARY KEY(challenge_id)

);

CREATE TABLE submissions(
    filename TEXT,
    submission_id SERIAL,
    submission_time TIMESTAMP,
    challenge_id INT,
    is_public BOOLEAN,
    user_id INT,
    score NUMERIC(5,2),

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
    is_admin,
    username
)VALUES(
    DEFAULT,
    'admin',
    'zero',
    'zeroadmin@chevron.com',
    '$2b$10$698NVC9dj8OzDxO25UPCsOP2tXywP.nqZz4rJcAkYxIXe.Necvw7q',
    '2000-12-13',
    TRUE,
    '2000-12-13',
    TRUE,
    'smith'
);

INSERT INTO challenges VALUES(
    DEFAULT,
    'admin',
    'sample description',
    '2000-12-13',
    '2000-12-13',
    '2000-12-13',
    '2000-12-13',
    'rsq',
    'sample challenge',
    0
);