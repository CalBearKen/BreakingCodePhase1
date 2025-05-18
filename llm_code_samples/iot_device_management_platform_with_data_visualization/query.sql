-- schema.sql
CREATE TABLE device (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE data_log (
    id SERIAL PRIMARY KEY,
    device_id INT REFERENCES device(id),
    data VARCHAR(500) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);