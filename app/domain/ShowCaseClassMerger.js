readCurrentClassOfAdmin = function(callback) {
  require("./Repository").findCurrentClassWithAllProjectsAndStudants(function(rows) {
    var currentClass = {
      name: rows[0].className,
      path: rows[0].classPath,
      projects: []
    };
    rows.forEach(row => {
      importProjectWithStudants(currentClass, row);
    });
    callback(currentClass)
  });
};

function importProjectWithStudants(currentClass, row) {
  currentProject = currentClass.projects.filter(
    storedProject => storedProject.path == row.projectPath
  );
  if (currentProject.length == 0) {
    currentProject = {
      name: row.projectName,
      path: row.projectPath,
      description: row.projectDescription,
      picture: row.picturePath,
      pages: []
    };
    currentClass.projects.push(currentProject);
  } else {
    currentProject = currentProject[0]
  }
 
  currentProject.pages.push({
    name: row.studentName,
    path: row.studentPath
  });
}

readClassesJsonShowCaseFile = function() {
  const fs = require("fs");
  let rawdata = fs.readFileSync(
    "../data-works/aceleradora-inclusiva-showcase-web/src/pages.json"
  );
  return JSON.parse(rawdata);
};

mergeClass = function(baseClass, newClass) {
  var merged = new Array();
  merged = merged.concat(baseClass);
  const foundIndex = merged.findIndex(cls => cls.path == newClass.path);
  if (foundIndex > 0) {
    merged.splice(foundIndex, 1);
  }
  merged.push(newClass);
  return merged;
};

module.exports = {
  mergeClass,
  readClassesJsonShowCaseFile,
  readCurrentClassOfAdmin
};
