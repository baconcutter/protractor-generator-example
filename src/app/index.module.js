import "../../node_modules/angular/angular";
import "../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap";
import "../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls";
import "../../node_modules/angular-ui-router/release/angular-ui-router.min";
import "../../node_modules/angular-ui-router-default/angular-ui-router-default";
import "./index.scss";
import {indexConfig} from "./index.config";
import {indexRoute} from "./index.route";
import {ListController} from "./pages/list/list.controller";
import {CreateController} from "./pages/create/create.controller";
import {TodoService} from "./todo.service";

angular.module('todo-app', [
  'ui.router',
  'ui.bootstrap'
])
  .service('todoService', TodoService)
  .controller('listController', ListController)
  .controller('createController', CreateController)
  .config(indexConfig)
  .config(indexRoute);