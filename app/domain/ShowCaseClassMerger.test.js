describe("Merge Classes, Projects and Studants", () => {
  var baseClasses = [
    {
      name: "Turma 01",
      path: "t01",
      projects: [
        {
          name: "Quem Sou Eu",
          path: "quem-sou-eu",
          description:
            "Conheça as páginas de perfil construídas por nossas estudantes",
          picture: "images/lapis.jpg",
          pages: [
            {
              name: "Léo",
              path: "leo"
            }
          ]
        }
      ]
    }
  ];

  var newClass = {
    name: "Turma 02",
    path: "t02",
    projects: [
      {
        name: "Quem Sou Eu",
        path: "quem-sou-eu",
        description:
          "Conheça as páginas de perfil construídas por nossas estudantes",
        pages: [
          {
            name: "Arthur",
            path: "arthur"
          }
        ]
      }
    ]
  };

  it("create class if not found", () => {
    let showCaseMerger = require("./ShowCaseClassMerger");

    mergedJsonClass = showCaseMerger.mergeClass(baseClasses, newClass);
    expect(mergedJsonClass[1]).toBe(newClass);
  });

  it("replace class if exists", () => {
    //Given a existing class with same path
    baseClasses.push({
      name: "Duplicated",
      path: newClass.path
    });
    let showCaseMerger = require("./ShowCaseClassMerger");

    mergedJsonClass = showCaseMerger.mergeClass(baseClasses, newClass);
    expect(mergedJsonClass.length).toBe(2);
    expect(mergedJsonClass[1]).toBe(newClass);
  });

  it("read the JSON Show case classes file", () => {
    let showCaseMerger = require("./ShowCaseClassMerger");
    classes = showCaseMerger.readClassesJsonShowCaseFile();
    expect(classes[0]).not.toBe(null);
  });

  it("read the ADMIN current class with projects and studants", () => {
    jest.mock("./Repository", () => ({
      findCurrentClassWithAllProjectsAndStudants: callback => {null,
        callback(null, [
          {
          className: "Turma 0",
          classPath: "turma-0",
          projectName: 'Quem sou eu',
          projectPath: 'Quem_sou_eu',
          projectDescription: 'Descricao quem_sou_eu',
          picturePath:  'images/lapis.jpg',
          studentName : "Leo",
          studentPath : "leo"
        },
        {
          className: "Turma 0",
          classPath: "turma-0",
          projectName: 'Quem sou eu',
          projectPath: 'Quem_sou_eu',
          projectDescription: 'Descricao quem_sou_eu',
          picturePath:  'images/lapis.jpg',
          studentName : "Fernando",
          studentPath : "fernando"
        }]
        );
      }
    }));
    
    let showCaseMerger = require("./ShowCaseClassMerger");
    showCaseMerger.readCurrentClassOfAdmin(function(currentClassInfo) {
      expect(currentClassInfo).toStrictEqual({
        name: 'Turma 0',
        path: 'turma-0',
        projects: [
          {
            name: 'Quem sou eu',
            path: 'Quem_sou_eu',
            description: 'Descricao quem_sou_eu',
            picture: 'images/lapis.jpg',
            pages: [
              {
                name : "Leo",
                path : "leo"
              },
              {
                name : "Fernando",
                path : "fernando"
              }
            ]
          }
        ]
      });
    });
  });
});
