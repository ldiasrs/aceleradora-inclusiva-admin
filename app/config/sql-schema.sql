
BEGIN TRANSACTION;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS ClassInfo (
   id integer NOT NULL PRIMARY KEY,
   className text,
   current boolean,
   createdDate date
);

INSERT OR REPLACE INTO ClassInfo(className,current,createdDate) 
   VALUES('Turma 4',1, datetime('now'));


CREATE TABLE IF NOT EXISTS Project (
   id integer NOT NULL PRIMARY KEY,
   active boolean,
   projectName text
);

INSERT OR REPLACE INTO Project(projectName,active) 
   VALUES('Quem_sou_eu', 1);
INSERT OR REPLACE INTO Project(projectName,active) 
   VALUES('Zine', 1);
INSERT OR REPLACE INTO Project(projectName,active) 
   VALUES('Form', 1);

CREATE TABLE IF NOT EXISTS Student (
   id integer NOT NULL PRIMARY KEY,
   studantName text,
   admissionDate date,
   classId integer,
   FOREIGN KEY (classId) REFERENCES ClassInfo(id)
);

CREATE TABLE IF NOT EXISTS ProjectDeliveryToken (
   id integer NOT NULL PRIMARY KEY,
   studentId integer,
   projectId integer,
   createdDate date,
   token text
);

CREATE TABLE IF NOT EXISTS DeliveriedProject (
   id integer NOT NULL PRIMARY KEY,
   createdDate date,
   token integer
);

INSERT OR REPLACE INTO Student(studantName, admissionDate, classId) 
   VALUES('Leo', datetime('now'), (SELECT MAX(id) FROM ClassInfo));
INSERT OR REPLACE INTO Student(studantName, admissionDate, classId) 
   VALUES('Caio', datetime('now'), (SELECT MAX(id) FROM ClassInfo));

COMMIT;
