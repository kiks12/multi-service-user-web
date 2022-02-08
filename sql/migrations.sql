CREATE DATABASE Multi_Service_Platform;


CREATE TABLE Users (
    user_id varchar(255) NOT NULL,
    username varchar(50) NOT NULL, 
    email varchar(100) NOT NULL,
    type varchar(10) NOT NULL,
    password varchar(255) NULL,
    address varchar(255) NOT NULL,
    contact varchar(16) NOT NULL,
);