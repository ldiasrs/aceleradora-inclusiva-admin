
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
   classId integer,
   projectName text,
   projectPath text,
   projectDescription text,
   picturePath text,
   active  boolean default 1,
   FOREIGN KEY (classId) REFERENCES ClassInfo(id)
);

CREATE TABLE IF NOT EXISTS DeliveriedProject (
   id integer NOT NULL PRIMARY KEY,
   createdDate date,
   deliveredName text,
   deliveredPath text,
   projectId integer,
   FOREIGN KEY (projectId) REFERENCES Project(id)
);

INSERT OR REPLACE INTO ClassInfo(className, classPath,current,createdDate) 
   VALUES('Turma 05', 't05', 1, datetime('now'));

INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, classId) 
   VALUES('Quem sou eu', 'quem_sou_eu', 'Descricao quem_sou_eu', 'images/lapis.jpg', (SELECT MAX(id) FROM ClassInfo));
INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, classId) 
   VALUES('Zine', 'zine', 'Descricao Zine', 'images/lapis.jpg', (SELECT MAX(id) FROM ClassInfo));
INSERT OR REPLACE INTO Project(projectName,projectPath,projectDescription,picturePath, classId) 
   VALUES('Form', 'form', 'Descricao Form', 'images/lapis.jpg', (SELECT MAX(id) FROM ClassInfo));

INSERT OR REPLACE INTO DeliveriedProject(deliveredName, deliveredPath, createdDate, projectId) 
   VALUES('Leo', 'leo', datetime('now'), (SELECT MAX(id) FROM Project));
INSERT OR REPLACE INTO DeliveriedProject(deliveredName, deliveredPath, createdDate, projectId) 
   VALUES('Fernando', 'fernando', datetime('now'), (SELECT MAX(id) FROM Project));

COMMIT;
