DROP DATABASE IF EXISTS greenfield;

CREATE DATABASE greenfield;

USE greenfield;

CREATE TABLE user (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR (255),
    password VARCHAR (20),
);

CREATE TABLE tasks (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date VARCHAR (255),
    description VARCHAR(300),
    location VARCHAR (255),
    org_id INTEGER NOT NULL,
    FOREIGN KEY (org_id) REFERENCES organizations(id)
);

CREATE TABLE  organizations (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(25),
    bio VARCHAR (255),
    contact_info VARCHAR (255)
);

CREATE TABLE users_tasks (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
