CREATE TABLE PUBLIC.PROJECT
(ID INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,
SUBJECT VARCHAR(255),
DESCRIPTION VARCHAR(255),
CREATEDATE DATE
);


CREATE TABLE PUBLIC.TASK
(ID INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,
TITLE VARCHAR(255),
STARTTIME DATE,
ENDTIME DATE,
STATUS VARCHAR(25),
PROJECTID INTEGER
);
