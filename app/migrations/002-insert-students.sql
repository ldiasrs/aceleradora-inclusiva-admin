BEGIN TRANSACTION;
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