
BEGIN TRANSACTION;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS ClassInfo (
   id integer NOT NULL PRIMARY KEY,
   className text,
   classPath text,
   current boolean,
   createdDate date
);

CREATE TABLE IF NOT EXISTS Project (
   id integer NOT NULL PRIMARY KEY,
   active boolean,
   projectName text,
   projectPath text,
   projectDescription text,
   picturePath text
);

CREATE TABLE IF NOT EXISTS Student (
   id integer NOT NULL PRIMARY KEY,
   studentName text,
   studentPath text,
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

INSERT OR REPLACE INTO ClassInfo(className,classPath,current,createdDate) 
   VALUES('Turma 04', 't04', 1, datetime('now'));

   projectPath text,
INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, active) 
   VALUES('Quem sou eu', 'Quem_sou_eu', 'Descricao quem_sou_eu', 'images/lapis.jpg', 1);
INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, active) 
   VALUES('Zine', 'Zine', 'Descricao Zine', 'images/lapis.jpg', 1);
INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, active) 
   VALUES('Form', 'Form', 'Descricao Form', 'images/lapis.jpg', 1);

INSERT OR REPLACE INTO Student(studentName, studentPath, admissionDate, classId) 
   VALUES('Leo', 'leo',datetime('now'), (SELECT MAX(id) FROM ClassInfo));
INSERT OR REPLACE INTO Student(studentName, studentPath, admissionDate, classId) 
   VALUES('Fernando', 'fernando', datetime('now'), (SELECT MAX(id) FROM ClassInfo));

COMMIT;
