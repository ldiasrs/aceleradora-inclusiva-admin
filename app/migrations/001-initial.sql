
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

COMMIT;
