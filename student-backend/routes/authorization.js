const AuthorizationController = require("../controllers/authorization");
exports.routesConfig = (app) => {
  app.post("/auth/register", AuthorizationController.register);
  app.post("/auth/login", AuthorizationController.login);
  app.get("/auth/studentList", AuthorizationController.getStudentList);
  app.delete("/auth/students/:id", AuthorizationController.deleteStudent);
  app.put("/auth/students/:id", AuthorizationController.editProfile);
};
